import { TypeScriptASTParser } from './src/core/archive/typescript-parser';
import { ParseOptions } from './src/core/types';
import path from 'path';

/**
 * Test the TypeScript Compiler API parser
 */
async function testTypeScriptParser() {
  console.log('🧪 Testing TypeScript Compiler API Parser...\n');

  const options: ParseOptions = {
    verbose: true,
    includeNodeModules: false,
    maxFileSize: 1024 * 1024, // 1MB
    skipPatterns: []
  };

  const parser = new TypeScriptASTParser(options);

  try {
    // Test with our advanced patterns test file
    const projectPath = process.cwd();
    console.log(`📁 Testing with project path: ${projectPath}\n`);

    const result = await parser.parseProject(projectPath);

    console.log('✅ Parser completed successfully!');
    console.log(`📊 Results:`);
    console.log(`  - Total files: ${result.stats.totalFiles}`);
    console.log(`  - Processed files: ${result.stats.processedFiles}`);
    console.log(`  - Total patterns: ${result.stats.totalPatterns}`);
    console.log(`  - Processing time: ${result.stats.processingTime}ms`);
    console.log(`  - Memory usage: ${result.stats.memoryUsage}MB`);
    console.log(`  - Errors: ${result.errors.length}`);

    if (result.patterns.length > 0) {
      console.log('\n🔍 Sample patterns found:');
      result.patterns.slice(0, 5).forEach((pattern, index) => {
        console.log(`  ${index + 1}. ${pattern.name} (${pattern.type})`);
        console.log(`     File: ${pattern.filePath}:${pattern.lineNumber}`);
        console.log(`     Complexity: ${pattern.metadata.complexity}`);
        if (pattern.metadata.parameters.length > 0) {
          console.log(`     Parameters: ${pattern.metadata.parameters.length}`);
        }
        if (pattern.metadata.genericTypes && pattern.metadata.genericTypes.length > 0) {
          console.log(`     Generic Types: ${pattern.metadata.genericTypes.join(', ')}`);
        }
      });
    }

    if (result.errors.length > 0) {
      console.log('\n⚠️  Errors encountered:');
      result.errors.slice(0, 3).forEach((error, index) => {
        console.log(`  ${index + 1}. ${error.filePath}: ${error.message}`);
      });
    }

  } catch (error) {
    console.error('❌ Parser test failed:', error);
  }
}

// Run the test
testTypeScriptParser().catch(console.error);
