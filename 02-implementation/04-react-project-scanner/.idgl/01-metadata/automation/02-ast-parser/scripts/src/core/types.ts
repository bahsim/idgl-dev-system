/**
 * Core types for the AST Parser
 * Following IDGL Spec: High-Quality AST Parser for React TypeScript Patterns
 * Implementation: TypeScript Compiler API with enhanced semantic analysis
 */

export interface CodePattern {
  id: string;
  name: string;
  type: PatternType;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  hash: string;
  metadata: PatternMetadata;
  dependencies: string[];
  exports: ExportInfo[];
}

export interface ExportInfo {
  type: string; // 'named', 'default', 're-export'
  name: string | null;
  path: string | null;
  isReExport: boolean;
}

export type PatternType = 
  | 'react-component'
  | 'custom-hook'
  | 'utility-function'
  | 'type-definition'
  | 'interface'
  | 'enum'
  | 'constant';

export interface PatternMetadata {
  // Basic metadata
  description?: string;
  complexity: number;
  parameters: ParameterInfo[];
  returnType?: string;
  
  // React-specific metadata
  isExported?: boolean;
  isDefault?: boolean;
  exportType?: string; // 'named', 'default', 're-export', 'none'
  exportName?: string | null;
  exportPath?: string | null;
  isReExported?: boolean;
  jsxReturnType?: boolean;
  
  // Type information
  genericTypes?: string[];
  propTypes?: Record<string, string>;
  
  // Usage information
  usageCount: number;
  lastModified: Date;
  
  // Enhanced semantic analysis
  purpose?: 'UI' | 'Logic' | 'Data' | 'Utility';
  architecturalMetrics?: {
    coupling: number;
    cohesion: number;
    abstraction: number;
    complexity: number;
    maintainability: number;
  };
  dependencies?: string[];
}

export interface ParameterInfo {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string | undefined;
}

export interface ParseContext {
  filePath: string;
  sourceCode: string;
  projectRoot: string;
  options: ParseOptions;
  lastFileCounts?: {
    functionCount: number;
    interfaceCount: number;
    typeCount: number;
  };
}

export interface ParseOptions {
  includeNodeModules?: boolean;
  maxFileSize?: number; // in bytes
  skipPatterns?: string[];
  verbose?: boolean;
  
  // Quality filtering options
  qualityFilters?: {
    minPatternDetectionRate?: number; // 0-100
    minTypeResolutionAccuracy?: number; // 0-100
    minSemanticAnalysisQuality?: number; // 0-100
    minCrossFileConsistency?: number; // 0-100
    minOverallQuality?: number; // 0-100
    includeLowQualityPatterns?: boolean; // Include patterns below quality thresholds
    qualityThresholds?: {
      high: number; // 80-100
      medium: number; // 60-79
      low: number; // 0-59
    };
  };
}

export interface ParseResult {
  patterns: CodePattern[];
  errors: ParseError[];
  stats: ParseStats;
  qualityReport?: QualityReport;
}

export interface QualityReport {
  quality: {
    patternDetectionRate: number;
    typeResolutionAccuracy: number;
    semanticAnalysisQuality: number;
    crossFileConsistency: number;
    overallQuality: number;
  };
  performance: {
    processingTime: number;
    memoryUsage: number;
    patternsPerSecond: number;
    efficiency: number;
  };
  recommendations: string[];
  timestamp: string;
}

export interface ParseError {
  filePath: string;
  lineNumber: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export interface ParseStats {
  totalFiles: number;
  processedFiles: number;
  totalPatterns: number;
  processingTime: number; // in milliseconds
  memoryUsage: number; // in MB
}
