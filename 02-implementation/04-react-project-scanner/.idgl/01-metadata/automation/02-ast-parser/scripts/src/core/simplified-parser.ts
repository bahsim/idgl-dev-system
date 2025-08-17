import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { CodePattern, ParseOptions, ParseResult, ParseError, ParseStats } from './types';
import { ParsingPipeline } from './parsing-pipeline';

/**
 * Simplified Parser - Replaces the monolithic TypeScriptASTParser
 * Uses the composable pipeline architecture for better maintainability
 */
export class SimplifiedParser {
  private options: ParseOptions;
  private program: ts.Program | null = null;
  private typeChecker: ts.TypeChecker | null = null;
  private pipeline: ParsingPipeline | null = null;
  private startTime: number = 0;

  constructor(options: ParseOptions) {
    this.options = options;
  }

  /**
   * Parse a single project directory using the simplified pipeline
   */
  async parseProject(projectPath: string): Promise<ParseResult> {
    this.startTime = Date.now();
    const startMemory = process.memoryUsage().heapUsed;

    try {
      console.log(`🔍 Creating TypeScript program for: ${projectPath}`);
      
      // Create TypeScript program
      this.program = this.createProgram(projectPath);
      if (!this.program) {
        throw new Error('Failed to create TypeScript program');
      }
      
      this.typeChecker = this.program.getTypeChecker();
      console.log(`✅ TypeScript program created successfully`);

      // Initialize the parsing pipeline
      this.pipeline = new ParsingPipeline(this.typeChecker);
      
      // Validate pipeline configuration
      const validation = this.pipeline.validatePipeline();
      if (!validation.isValid) {
        throw new Error(`Pipeline validation failed: ${validation.issues.join(', ')}`);
      }

      // Get source files
      const allSourceFiles = this.program.getSourceFiles();
      console.log(`📁 Total source files in program: ${allSourceFiles.length}`);
      
      // Filter source files to only include those in our project directory
      const sourceFiles = this.filterSourceFiles(allSourceFiles, projectPath);
      console.log(`📁 Filtered source files for project: ${sourceFiles.length}`);

      // Process files using the pipeline
      const result = await this.pipeline.processFiles(sourceFiles, this.options);
      
      // Update stats with timing information
      const endTime = Date.now();
      const endMemory = process.memoryUsage().heapUsed;
      const processingTime = endTime - this.startTime;
      const memoryUsage = (endMemory - startMemory) / 1024 / 1024; // MB

      const updatedStats: ParseStats = {
        ...result.stats,
        processingTime,
        memoryUsage
      };

      // Log pipeline statistics
      if (this.options.verbose) {
        this.logPipelineStats();
      }

      return {
        ...result,
        stats: updatedStats
      };

    } catch (error) {
      console.error(`❌ Error in parseProject: ${error}`);
      const endTime = Date.now();
      const processingTime = endTime - this.startTime;

      return {
        patterns: [],
        errors: [{
          filePath: projectPath,
          message: error instanceof Error ? error.message : 'Unknown error',
          lineNumber: 0,
          severity: 'error'
        }],
        stats: {
          totalFiles: 0,
          processedFiles: 0,
          totalPatterns: 0,
          processingTime,
          memoryUsage: 0
        }
      };
    }
  }

  /**
   * Create TypeScript program for the project
   */
  private createProgram(projectPath: string): ts.Program | null {
    try {
      // Look for tsconfig.json
      const tsConfigPath = ts.findConfigFile(projectPath, ts.sys.fileExists);
      
      if (tsConfigPath) {
        // Use existing tsconfig.json
        const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
        const parsedConfig = ts.parseJsonConfigFileContent(
          configFile.config,
          ts.sys,
          path.dirname(tsConfigPath)
        );

        return ts.createProgram(parsedConfig.fileNames, parsedConfig.options);
      } else {
        // Create program with default options and include all TypeScript files
        const compilerOptions: ts.CompilerOptions = {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.CommonJS,
          jsx: ts.JsxEmit.React,
          allowJs: true,
          allowSyntheticDefaultImports: true,
          esModuleInterop: true,
          skipLibCheck: true,
          strict: false,
          noEmit: true,
          resolveJsonModule: true
        };

        // Find TypeScript/JavaScript files
        const fileNames = this.findSourceFiles(projectPath);
        
        if (fileNames.length === 0) {
          console.log(`⚠️  No TypeScript files found in project path: ${projectPath}`);
        } else {
          console.log(`📁 Found ${fileNames.length} TypeScript files for program creation`);
        }
        
        return ts.createProgram(fileNames, compilerOptions);
      }
    } catch (error) {
      console.error(`Error creating TypeScript program: ${error}`);
      return null;
    }
  }

  /**
   * Find all TypeScript/JavaScript source files in the project
   */
  private findSourceFiles(projectPath: string): string[] {
    const fileNames: string[] = [];
    
    const findFiles = (dir: string) => {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          
          if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
            findFiles(fullPath);
          } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
              fileNames.push(fullPath);
            }
          }
        }
      } catch (error) {
        // Skip directories we can't read
        console.log(`⚠️  Could not read directory: ${dir}`);
      }
    };

    console.log(`🔍 Searching for source files in: ${projectPath}`);
    findFiles(projectPath);
    console.log(`📁 Total source files found: ${fileNames.length}`);
    return fileNames;
  }

  /**
   * Filter source files to only include those in our project directory
   */
  private filterSourceFiles(allSourceFiles: readonly ts.SourceFile[], projectPath: string): ts.SourceFile[] {
    return allSourceFiles.filter(file => {
      if (file.isDeclarationFile) return false;
      
      // Normalize paths for comparison
      const normalizedFileName = file.fileName.replace(/\\/g, '/');
      const normalizedProjectPath = projectPath.replace(/\\/g, '/');
      
      // Check if file is within our project directory OR is a test file in the project
      const isInProject = normalizedFileName.includes(normalizedProjectPath);
      const isTestFile = normalizedFileName.includes('test-') || 
                         normalizedFileName.includes('.test.') || 
                         normalizedFileName.includes('.spec.');
      
      return isInProject || isTestFile;
    });
  }

  /**
   * Log pipeline statistics
   */
  private logPipelineStats(): void {
    if (!this.pipeline) return;

    const stats = this.pipeline.getPipelineStats();
    
    console.log('\n📊 Pipeline Statistics:');
    console.log(`  Component Count: ${stats.componentCount}`);
    console.log(`  Components: ${stats.components.join(', ')}`);
    console.log('\n🔄 Pipeline Order:');
    stats.pipelineOrder.forEach((step, index) => {
      console.log(`  ${index + 1}. ${step}`);
    });
  }

  /**
   * Get pipeline instance for testing or advanced usage
   */
  getPipeline(): ParsingPipeline | null {
    return this.pipeline;
  }

  /**
   * Get TypeScript program for advanced usage
   */
  getProgram(): ts.Program | null {
    return this.program;
  }

  /**
   * Get TypeScript type checker for advanced usage
   */
  getTypeChecker(): ts.TypeChecker | null {
    return this.typeChecker;
  }

  /**
   * Process a single file using the pipeline
   */
  async processSingleFile(filePath: string): Promise<ParseResult> {
    if (!this.pipeline || !this.program) {
      throw new Error('Parser not initialized. Call parseProject() first.');
    }

    // Find the source file in the program
    const sourceFile = this.program.getSourceFile(filePath);
    if (!sourceFile) {
      throw new Error(`Source file not found: ${filePath}`);
    }

    return this.pipeline.processFile(sourceFile, this.options);
  }

  /**
   * Get memory usage statistics
   */
  getMemoryUsage(): {
    heapUsed: number;
    heapTotal: number;
    external: number;
    rss: number;
  } {
    return process.memoryUsage();
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.program = null;
    this.typeChecker = null;
    this.pipeline = null;
  }
}
