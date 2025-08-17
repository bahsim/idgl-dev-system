/**
 * CLI Interface for Simplified AST Parser
 * Using the new composable architecture with focused components
 * Following IDGL Spec: Simplified AST Parser Architecture
 */

import * as fs from 'fs';
import * as path from 'path';
import { SimplifiedParser } from './core/simplified-parser';
import { ParseOptions } from './core/types';

interface CLIArgs {
  projectRoot: string;
  outputFile?: string;
  verbose?: boolean;
  maxFileSize?: number;
  skipPatterns?: string[];
}

function parseArgs(): CLIArgs {
  const args = process.argv.slice(2);
  const cliArgs: CLIArgs = {
    projectRoot: process.cwd()
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--project':
      case '-p':
        cliArgs.projectRoot = args[++i] || process.cwd();
        break;
      case '--output':
      case '-o':
        const output = args[++i];
        if (output) {
          cliArgs.outputFile = output;
        }
        break;
      case '--verbose':
      case '-v':
        cliArgs.verbose = true;
        break;
      case '--max-file-size':
        const size = args[++i];
        if (size) {
          cliArgs.maxFileSize = parseInt(size, 10);
        }
        break;
      case '--skip':
        const patterns = args[++i];
        if (patterns) {
          cliArgs.skipPatterns = patterns.split(',');
        }
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;
    }
  }

  return cliArgs;
}

function printHelp(): void {
  // eslint-disable-next-line no-console
  console.log(`
Simplified AST Parser CLI - React TypeScript Code Analysis Tool
Using the new composable architecture with focused components

Usage: npx ts-node cli.ts [options]

Options:
  -p, --project <path>        Project root directory (default: current directory)
  -o, --output <file>         Output file path (default: ast-patterns.json)
  -v, --verbose               Enable verbose logging and pipeline statistics
  --max-file-size <bytes>     Maximum file size to process (default: 1MB)
  --skip <patterns>           Comma-separated patterns to skip (default: node_modules,.git,dist,build)
  -h, --help                  Show this help message

Examples:
  npx ts-node cli.ts --project ./src --output patterns.json
  npx ts-node cli.ts --verbose --skip node_modules,dist
  npx ts-node cli.ts --max-file-size 2097152

Architecture:
  • Pattern Extractor: Extracts patterns from AST nodes
  • Type Resolver: Resolves TypeScript type information
  • Semantic Analyzer: Analyzes purpose and complexity
  • Export Tracker: Tracks export/import relationships
  • Quality Calculator: Calculates quality metrics
  • Parsing Pipeline: Orchestrates all components
`);
}

async function main(): Promise<void> {
  try {
    const args = parseArgs();
    
    // Validate project root
    if (!fs.existsSync(args.projectRoot)) {
      // eslint-disable-next-line no-console
      console.error(`Error: Project root directory does not exist: ${args.projectRoot}`);
      process.exit(1);
    }

    // Set default output file if not specified
    const outputFile = args.outputFile || path.join(args.projectRoot, 'ast-patterns.json');

    // Create parser options
    const options: ParseOptions = {
      verbose: args.verbose || false,
      ...(args.maxFileSize && { maxFileSize: args.maxFileSize }),
      ...(args.skipPatterns && { skipPatterns: args.skipPatterns })
    };

    // eslint-disable-next-line no-console
    console.log(`🔍 Starting Simplified AST Parser...`);
    // eslint-disable-next-line no-console
    console.log(`📁 Project Root: ${args.projectRoot}`);
    // eslint-disable-next-line no-console
    console.log(`📄 Output File: ${outputFile}`);
    // eslint-disable-next-line no-console
    console.log(`🏗️  Architecture: Composable components with pipeline orchestration`);
    
    if (options.verbose) {
      // eslint-disable-next-line no-console
      console.log(`⚙️  Options:`, options);
    }

    // Create parser instance using the NEW simplified architecture
    const parser = new SimplifiedParser(options);

    // Parse project
    // eslint-disable-next-line no-console
    console.log(`\n🚀 Parsing TypeScript files with simplified architecture...`);
    const startTime = Date.now();
    
    const result = await parser.parseProject(args.projectRoot);
    
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Display results
    // eslint-disable-next-line no-console
    console.log(`\n✅ Parsing completed in ${duration}ms`);
    // eslint-disable-next-line no-console
    console.log(`📊 Statistics:`);
    // eslint-disable-next-line no-console
    console.log(`   • Total files: ${result.stats.totalFiles}`);
    // eslint-disable-next-line no-console
    console.log(`   • Processed files: ${result.stats.processedFiles}`);
    // eslint-disable-next-line no-console
    console.log(`   • Total patterns: ${result.stats.totalPatterns}`);
    // eslint-disable-next-line no-console
    console.log(`   • Processing time: ${result.stats.processingTime}ms`);
    // eslint-disable-next-line no-console
    console.log(`   • Memory usage: ${result.stats.memoryUsage}MB`);

    // Display quality metrics if available
    if (result.qualityReport) {
      // eslint-disable-next-line no-console
      console.log(`\n📈 Quality Metrics:`);
      // eslint-disable-next-line no-console
      console.log(`   • Overall Quality: ${result.qualityReport.quality.overallQuality.toFixed(1)}%`);
      // eslint-disable-next-line no-console
      console.log(`   • Pattern Detection: ${result.qualityReport.quality.patternDetectionRate.toFixed(1)}%`);
      // eslint-disable-next-line no-console
      console.log(`   • Type Resolution: ${result.qualityReport.quality.typeResolutionAccuracy.toFixed(1)}%`);
      // eslint-disable-next-line no-console
      console.log(`   • Semantic Analysis: ${result.qualityReport.quality.semanticAnalysisQuality.toFixed(1)}%`);
    }

    if (result.errors.length > 0) {
      // eslint-disable-next-line no-console
      console.log(`\n⚠️  Errors encountered: ${result.errors.length}`);
      if (options.verbose) {
        result.errors.forEach(error => {
          // eslint-disable-next-line no-console
          console.log(`   • ${error.filePath}:${error.lineNumber} - ${error.message}`);
        });
      }
    }

    // Group patterns by type
    const patternsByType = result.patterns.reduce((acc, pattern) => {
      acc[pattern.type] = (acc[pattern.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // eslint-disable-next-line no-console
    console.log(`\n📈 Patterns by type:`);
    Object.entries(patternsByType).forEach(([type, count]) => {
      // eslint-disable-next-line no-console
      console.log(`   • ${type}: ${count}`);
    });

    // Display pipeline statistics if verbose
    if (options.verbose) {
      const pipeline = parser.getPipeline();
      if (pipeline) {
        const pipelineStats = pipeline.getPipelineStats();
        // eslint-disable-next-line no-console
        console.log(`\n🔄 Pipeline Architecture:`);
        // eslint-disable-next-line no-console
        console.log(`   • Components: ${pipelineStats.componentCount}`);
        // eslint-disable-next-line no-console
        console.log(`   • Pipeline Order:`);
        pipelineStats.pipelineOrder.forEach((step, index) => {
          // eslint-disable-next-line no-console
          console.log(`     ${index + 1}. ${step}`);
        });
      }
    }

    // Write output file
    const outputData = {
      metadata: {
        generatedAt: new Date().toISOString(),
        projectRoot: args.projectRoot,
        parserVersion: '2.0.0 - Simplified Architecture',
        architecture: 'Composable components with pipeline orchestration',
        stats: result.stats
      },
      patterns: result.patterns,
      errors: result.errors,
      qualityReport: result.qualityReport
    };

    // Ensure output directory exists
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write JSON file
    fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2));
    // eslint-disable-next-line no-console
    console.log(`\n💾 Results saved to: ${outputFile}`);

    // Display sample patterns if verbose
    if (options.verbose && result.patterns.length > 0) {
      // eslint-disable-next-line no-console
      console.log(`\n🔍 Sample patterns:`);
      result.patterns.slice(0, 3).forEach(pattern => {
        // eslint-disable-next-line no-console
        console.log(`   • ${pattern.name} (${pattern.type}) at ${pattern.filePath}:${pattern.lineNumber}`);
        if (pattern.metadata.purpose) {
          // eslint-disable-next-line no-console
          console.log(`     Purpose: ${pattern.metadata.purpose}, Complexity: ${pattern.metadata.complexity}`);
        }
      });
    }

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`\n❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    if (process.argv.includes('--verbose')) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    process.exit(1);
  }
}

// Run CLI if called directly
if (require.main === module) {
  main().catch(error => {
    // eslint-disable-next-line no-console
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { main as runCLI };
