import * as ts from 'typescript';
import { CodePattern, ParseResult, ParseError, ParseStats, ParseOptions } from './types';
import { PatternExtractor } from './pattern-extractor';
import { TypeResolver } from './type-resolver';
import { SemanticAnalyzer } from './semantic-analyzer';
import { ExportTracker } from './export-tracker';
import { QualityCalculator } from './quality-calculator';

/**
 * Parsing Pipeline - Orchestrates focused components sequentially
 * Single Responsibility: Only orchestrates the pipeline, no parsing logic
 */
export class ParsingPipeline {
  private patternExtractor: PatternExtractor;
  private typeResolver: TypeResolver;
  private semanticAnalyzer: SemanticAnalyzer;
  private exportTracker: ExportTracker;
  private qualityCalculator: QualityCalculator;
  private typeChecker: ts.TypeChecker;

  constructor(typeChecker: ts.TypeChecker) {
    this.typeChecker = typeChecker;
    this.patternExtractor = new PatternExtractor();
    this.typeResolver = new TypeResolver(typeChecker);
    this.semanticAnalyzer = new SemanticAnalyzer();
    this.exportTracker = new ExportTracker();
    this.qualityCalculator = new QualityCalculator();
  }

  /**
   * Process a single TypeScript source file through the pipeline
   */
  async processFile(sourceFile: ts.SourceFile, options: ParseOptions = {}): Promise<ParseResult> {
    const startTime = Date.now();
    const startMemory = process.memoryUsage().heapUsed;
    
    try {
      console.log(`🔍 Processing file: ${sourceFile.fileName}`);
      
      // Step 1: Extract patterns (Pattern Extractor)
      const patterns = this.patternExtractor.extractPatterns(sourceFile);
      console.log(`📊 Extracted ${patterns.length} patterns`);
      
      // Step 2: Enrich with type information (Type Resolver)
      const typedPatterns = await this.enrichWithTypeInfo(patterns, sourceFile);
      console.log(`🔧 Enriched patterns with type information`);
      
      // Step 3: Analyze semantics (Semantic Analyzer)
      const semanticPatterns = await this.enrichWithSemantics(typedPatterns, sourceFile);
      console.log(`🧠 Analyzed semantic information`);
      
      // Step 4: Track exports and dependencies (Export Tracker)
      const enrichedPatterns = await this.enrichWithExportInfo(semanticPatterns, sourceFile);
      console.log(`📤 Tracked export and dependency information`);
      
      // Step 5: Calculate quality metrics (Quality Calculator)
      const qualityReport = this.qualityCalculator.calculate(enrichedPatterns);
      console.log(`📈 Calculated quality metrics`);
      
      const endTime = Date.now();
      const endMemory = process.memoryUsage().heapUsed;
      const processingTime = endTime - startTime;
      const memoryUsage = (endMemory - startMemory) / 1024 / 1024; // MB
      
      const stats: ParseStats = {
        totalFiles: 1,
        processedFiles: 1,
        totalPatterns: enrichedPatterns.length,
        processingTime,
        memoryUsage
      };
      
      return {
        patterns: enrichedPatterns,
        errors: [], // No errors in successful processing
        stats,
        qualityReport
      };
      
    } catch (error) {
      console.error(`❌ Error processing file: ${error}`);
      const endTime = Date.now();
      const processingTime = endTime - startTime;
      
      return {
        patterns: [],
        errors: [{
          filePath: sourceFile.fileName,
          lineNumber: 0,
          message: error instanceof Error ? error.message : 'Unknown error',
          severity: 'error'
        }],
        stats: {
          totalFiles: 1,
          processedFiles: 0,
          totalPatterns: 0,
          processingTime,
          memoryUsage: 0
        }
      };
    }
  }

  /**
   * Process multiple files in parallel
   */
  async processFiles(sourceFiles: ts.SourceFile[], options: ParseOptions = {}): Promise<ParseResult> {
    const startTime = Date.now();
    const startMemory = process.memoryUsage().heapUsed;
    
    const allPatterns: CodePattern[] = [];
    const allErrors: ParseError[] = [];
    let processedFiles = 0;
    
    try {
      console.log(`🔍 Processing ${sourceFiles.length} files`);
      
      // Process files in parallel for better performance
      const filePromises = sourceFiles.map(sourceFile => 
        this.processFile(sourceFile, options)
      );
      
      const results = await Promise.allSettled(filePromises);
      
      // Aggregate results
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          allPatterns.push(...result.value.patterns);
          allErrors.push(...result.value.errors);
          if (result.value.stats.processedFiles > 0) {
            processedFiles++;
          }
        } else {
          allErrors.push({
            filePath: sourceFiles[index].fileName,
            lineNumber: 0,
            message: result.reason instanceof Error ? result.reason.message : 'Unknown error',
            severity: 'error'
          });
        }
      });
      
      const endTime = Date.now();
      const endMemory = process.memoryUsage().heapUsed;
      const processingTime = endTime - startTime;
      const memoryUsage = (endMemory - startMemory) / 1024 / 1024; // MB
      
      const stats: ParseStats = {
        totalFiles: sourceFiles.length,
        processedFiles,
        totalPatterns: allPatterns.length,
        processingTime,
        memoryUsage
      };
      
      // Calculate overall quality report
      const qualityReport = this.qualityCalculator.calculate(allPatterns, allErrors);
      
      return {
        patterns: allPatterns,
        errors: allErrors,
        stats,
        qualityReport
      };
      
    } catch (error) {
      console.error(`❌ Error processing files: ${error}`);
      const endTime = Date.now();
      const processingTime = endTime - startTime;
      
      return {
        patterns: [],
        errors: [{
          filePath: 'multiple files',
          lineNumber: 0,
          message: error instanceof Error ? error.message : 'Unknown error',
          severity: 'error'
        }],
        stats: {
          totalFiles: sourceFiles.length,
          processedFiles: 0,
          totalPatterns: 0,
          processingTime,
          memoryUsage: 0
        }
      };
    }
  }

  /**
   * Enrich patterns with type information
   */
  private async enrichWithTypeInfo(patterns: CodePattern[], sourceFile: ts.SourceFile): Promise<CodePattern[]> {
    return patterns.map(pattern => {
      try {
        // Find the corresponding AST node for this pattern
        const node = this.findNodeForPattern(pattern, sourceFile);
        if (node) {
          return this.typeResolver.enrich(pattern, node);
        }
        return pattern;
      } catch (error) {
        console.warn(`⚠️  Could not enrich pattern ${pattern.name} with type info: ${error}`);
        return pattern;
      }
    });
  }

  /**
   * Enrich patterns with semantic information
   */
  private async enrichWithSemantics(patterns: CodePattern[], sourceFile: ts.SourceFile): Promise<CodePattern[]> {
    return patterns.map(pattern => {
      try {
        // Find the corresponding AST node for this pattern
        const node = this.findNodeForPattern(pattern, sourceFile);
        if (node) {
          return this.semanticAnalyzer.analyze(pattern, node);
        }
        return pattern;
      } catch (error) {
        console.warn(`⚠️  Could not enrich pattern ${pattern.name} with semantic info: ${error}`);
        return pattern;
      }
    });
  }

  /**
   * Enrich patterns with export information
   */
  private async enrichWithExportInfo(patterns: CodePattern[], sourceFile: ts.SourceFile): Promise<CodePattern[]> {
    return patterns.map(pattern => {
      try {
        // Find the corresponding AST node for this pattern
        const node = this.findNodeForPattern(pattern, sourceFile);
        if (node) {
          return this.exportTracker.enrichWithExportInfo(pattern, node, sourceFile);
        }
        return pattern;
      } catch (error) {
        console.warn(`⚠️  Could not enrich pattern ${pattern.name} with export info: ${error}`);
        return pattern;
      }
    });
  }

  /**
   * Find the AST node corresponding to a pattern
   * This is a simplified approach - in a real implementation, you'd want to maintain
   * a mapping between patterns and their source nodes
   */
  private findNodeForPattern(pattern: CodePattern, sourceFile: ts.SourceFile): ts.Node | null {
    try {
      // Simple approach: search for the pattern name in the AST
      let foundNode: ts.Node | null = null;
      
      const visit = (node: ts.Node) => {
        if (foundNode) return; // Already found
        
        if (ts.isFunctionDeclaration(node) && node.name?.text === pattern.name) {
          foundNode = node;
        } else if (ts.isClassDeclaration(node) && node.name?.text === pattern.name) {
          foundNode = node;
        } else if (ts.isInterfaceDeclaration(node) && node.name.text === pattern.name) {
          foundNode = node;
        } else if (ts.isTypeAliasDeclaration(node) && node.name.text === pattern.name) {
          foundNode = node;
        } else if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === pattern.name) {
          foundNode = node;
        }
        
        if (!foundNode) {
          ts.forEachChild(node, visit);
        }
      };
      
      visit(sourceFile);
      return foundNode;
      
    } catch (error) {
      console.warn(`⚠️  Could not find node for pattern ${pattern.name}: ${error}`);
      return null;
    }
  }

  /**
   * Get pipeline statistics
   */
  getPipelineStats(): {
    componentCount: number;
    components: string[];
    pipelineOrder: string[];
  } {
    return {
      componentCount: 5,
      components: [
        'PatternExtractor',
        'TypeResolver', 
        'SemanticAnalyzer',
        'ExportTracker',
        'QualityCalculator'
      ],
      pipelineOrder: [
        'Pattern Extraction',
        'Type Resolution',
        'Semantic Analysis', 
        'Export Tracking',
        'Quality Calculation'
      ]
    };
  }

  /**
   * Validate pipeline configuration
   */
  validatePipeline(): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    
    if (!this.typeChecker) {
      issues.push('TypeChecker is not initialized');
    }
    
    if (!this.patternExtractor) {
      issues.push('PatternExtractor is not initialized');
    }
    
    if (!this.typeResolver) {
      issues.push('TypeResolver is not initialized');
    }
    
    if (!this.semanticAnalyzer) {
      issues.push('SemanticAnalyzer is not initialized');
    }
    
    if (!this.exportTracker) {
      issues.push('ExportTracker is not initialized');
    }
    
    if (!this.qualityCalculator) {
      issues.push('QualityCalculator is not initialized');
    }
    
    return {
      isValid: issues.length === 0,
      issues
    };
  }
}
