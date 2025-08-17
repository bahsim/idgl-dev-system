/**
 * Simplified AST Parser Architecture - Core Components
 * 
 * This module exports the composable, focused components that replace the monolithic
 * TypeScriptASTParser with a maintainable, testable architecture.
 * 
 * Architecture Principles:
 * - Single Responsibility: Each component does one thing well
 * - Composition over Inheritance: Components can be mixed and matched
 * - Pipeline Pattern: Data flows through components sequentially
 * - Error Boundaries: Each component handles its own errors gracefully
 */

// Core Components
export { PatternExtractor } from './pattern-extractor';
export { TypeResolver } from './type-resolver';
export { SemanticAnalyzer } from './semantic-analyzer';
export { ExportTracker } from './export-tracker';
export { QualityCalculator } from './quality-calculator';

// Pipeline Orchestration
export { ParsingPipeline } from './parsing-pipeline';

// Main Parser (Replaces TypeScriptASTParser)
export { SimplifiedParser } from './simplified-parser';

// Types (re-export for convenience)
export * from './types';

/**
 * Usage Example:
 * 
 * ```typescript
 * import { SimplifiedParser } from './core';
 * 
 * const parser = new SimplifiedParser({ verbose: true });
 * const result = await parser.parseProject('./my-project');
 * 
 * console.log(`Found ${result.patterns.length} patterns`);
 * console.log(`Quality: ${result.qualityReport?.quality.overallQuality}%`);
 * ```
 * 
 * Component Usage:
 * 
 * ```typescript
 * import { PatternExtractor, TypeResolver } from './core';
 * 
 * // Use components independently
 * const extractor = new PatternExtractor();
 * const patterns = extractor.extractPatterns(sourceFile);
 * 
 * const resolver = new TypeResolver(typeChecker);
 * const enriched = patterns.map(p => resolver.enrich(p, node));
 * ```
 */
