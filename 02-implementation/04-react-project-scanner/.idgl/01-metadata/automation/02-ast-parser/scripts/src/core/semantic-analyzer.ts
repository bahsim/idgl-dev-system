import * as ts from 'typescript';
import { CodePattern, PatternMetadata } from './types';

/**
 * Semantic Analyzer - Analyzes purpose and complexity independently
 * Single Responsibility: Only analyzes semantics, no pattern extraction or type resolution
 */
export class SemanticAnalyzer {
  
  /**
   * Analyze a pattern for semantic information
   */
  analyze(pattern: CodePattern, node: ts.Node): CodePattern {
    const enrichedMetadata = { ...pattern.metadata };
    
    // Analyze purpose
    enrichedMetadata.purpose = this.analyzePurpose(node);
    
    // Calculate complexity
    enrichedMetadata.complexity = this.calculateComplexity(node);
    
    // Calculate architectural metrics
    enrichedMetadata.architecturalMetrics = this.calculateArchitecturalMetrics(node);
    
    // Analyze dependencies
    enrichedMetadata.dependencies = this.analyzeDependencies(node);

    return {
      ...pattern,
      metadata: enrichedMetadata
    };
  }

  /**
   * Analyze the purpose of a pattern (UI, Logic, Data, Utility)
   */
  private analyzePurpose(node: ts.Node): 'UI' | 'Logic' | 'Data' | 'Utility' {
    // Check for UI patterns (JSX, React components)
    if (this.hasJSXReturn(node)) {
      return 'UI';
    }
    
    // Check for data patterns (interfaces, types, data structures)
    if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
      return this.analyzeDataPatternPurpose(node);
    }
    
    // Check for logic patterns (functions with complex logic)
    if (ts.isFunctionLike(node)) {
      return this.analyzeLogicPatternPurpose(node);
    }
    
    return 'Utility';
  }

  /**
   * Analyze data pattern purpose
   */
  private analyzeDataPatternPurpose(node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration): 'UI' | 'Data' {
    const name = node.name.text.toLowerCase();
    
    // Check for common data pattern names
    if (name.includes('props') || name.includes('state') || name.includes('config')) {
      return 'Data';
    }
    if (name.includes('api') || name.includes('response') || name.includes('request')) {
      return 'Data';
    }
    if (name.includes('model') || name.includes('entity') || name.includes('dto')) {
      return 'Data';
    }
    
    // Check for UI-related data
    if (name.includes('component') || name.includes('ui') || name.includes('view')) {
      return 'UI';
    }
    
    return 'Data';
  }

  /**
   * Analyze logic pattern purpose
   */
  private analyzeLogicPatternPurpose(node: ts.FunctionLikeDeclaration): 'UI' | 'Logic' | 'Utility' {
    const name = this.getNodeName(node) || '';
    const hasJSX = this.hasJSXReturn(node);
    const hasStateManagement = this.hasStateManagementPatterns(node);
    const hasBusinessLogic = this.hasBusinessLogicPatterns(node);
    
    if (hasJSX) return 'UI';
    if (hasStateManagement) return 'Logic';
    if (hasBusinessLogic) return 'Logic';
    if (name.startsWith('use')) return 'Logic'; // Custom hooks
    
    return 'Utility';
  }

  /**
   * Calculate cyclomatic complexity
   */
  private calculateComplexity(node: ts.Node): number {
    let complexity = 1; // Base complexity
    
    const visit = (n: ts.Node) => {
      if (ts.isIfStatement(n) || ts.isForStatement(n) || ts.isWhileStatement(n) || 
          ts.isDoStatement(n) || ts.isSwitchStatement(n) || ts.isCatchClause(n) ||
          ts.isConditionalExpression(n)) {
        complexity++;
      }
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return complexity;
  }

  /**
   * Calculate architectural metrics for a pattern
   */
  private calculateArchitecturalMetrics(node: ts.Node): {
    coupling: number;
    cohesion: number;
    abstraction: number;
    complexity: number;
    maintainability: number;
  } {
    const metrics = {
      coupling: this.calculateCoupling(node),
      cohesion: this.calculateCohesion(node),
      abstraction: this.calculateAbstraction(node),
      complexity: this.calculateComplexity(node),
      maintainability: 0
    };
    
    // Calculate maintainability index (simplified)
    metrics.maintainability = Math.max(0, 100 - metrics.complexity - metrics.coupling);
    
    return metrics;
  }

  /**
   * Calculate coupling (how dependent a pattern is on other patterns)
   */
  private calculateCoupling(node: ts.Node): number {
    let coupling = 0;
    
    const visit = (n: ts.Node) => {
      // Import statements increase coupling
      if (ts.isImportDeclaration(n)) coupling += 2;
      
      // External function calls increase coupling
      if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
        const name = n.expression.text;
        if (!this.isBuiltInFunction(name)) coupling += 1;
      }
      
      // Property access on external objects
      if (ts.isPropertyAccessExpression(n)) coupling += 0.5;
      
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return Math.min(10, coupling); // Cap at 10
  }

  /**
   * Calculate cohesion (how focused a pattern is on a single responsibility)
   */
  private calculateCohesion(node: ts.Node): number {
    let cohesion = 10; // Start with high cohesion
    
    const visit = (n: ts.Node) => {
      // Multiple return statements can reduce cohesion
      if (ts.isReturnStatement(n)) cohesion -= 0.5;
      
      // Multiple different types of operations can reduce cohesion
      if (ts.isBinaryExpression(n)) cohesion -= 0.2;
      
      // Complex nested structures can reduce cohesion
      if (ts.isIfStatement(n) || ts.isSwitchStatement(n)) cohesion -= 0.3;
      
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return Math.max(1, cohesion); // Minimum 1
  }

  /**
   * Calculate abstraction level
   */
  private calculateAbstraction(node: ts.Node): number {
    let abstraction = 5; // Start with medium abstraction
    
    const visit = (n: ts.Node) => {
      // Generic types increase abstraction
      if (ts.isTypeParameterDeclaration(n)) abstraction += 1;
      
      // Interface implementations increase abstraction
      if (ts.isHeritageClause(n)) abstraction += 1;
      
      // Abstract methods increase abstraction
      if (ts.isMethodDeclaration(n) && n.modifiers?.some(m => m.kind === ts.SyntaxKind.AbstractKeyword)) {
        abstraction += 2;
      }
      
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return Math.min(10, Math.max(1, abstraction)); // Between 1-10
  }

  /**
   * Analyze dependencies from a node
   */
  private analyzeDependencies(node: ts.Node): string[] {
    const dependencies: string[] = [];
    
    const visit = (n: ts.Node) => {
      if (ts.isImportDeclaration(n)) {
        const moduleSpecifier = n.moduleSpecifier;
        if (ts.isStringLiteral(moduleSpecifier)) {
          dependencies.push(moduleSpecifier.text);
        }
      }
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return dependencies;
  }

  /**
   * Check for state management patterns
   */
  private hasStateManagementPatterns(node: ts.Node): boolean {
    let hasStateManagement = false;
    
    const visit = (n: ts.Node) => {
      if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
        const hookName = n.expression.text;
        if (['useState', 'useReducer', 'useContext', 'useRef'].includes(hookName)) {
          hasStateManagement = true;
        }
      }
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return hasStateManagement;
  }

  /**
   * Check for business logic patterns
   */
  private hasBusinessLogicPatterns(node: ts.Node): boolean {
    let hasBusinessLogic = false;
    
    const visit = (n: ts.Node) => {
      // Check for complex conditional logic
      if (ts.isIfStatement(n) || ts.isSwitchStatement(n)) {
        hasBusinessLogic = true;
      }
      
      // Check for loops with business logic
      if (ts.isForStatement(n) || ts.isWhileStatement(n)) {
        hasBusinessLogic = true;
      }
      
      // Check for error handling
      if (ts.isTryStatement(n) || ts.isCatchClause(n)) {
        hasBusinessLogic = true;
      }
      
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return hasBusinessLogic;
  }

  /**
   * Check if a function returns JSX
   */
  private hasJSXReturn(node: ts.Node): boolean {
    let hasJSX = false;
    
    const visit = (n: ts.Node) => {
      if (ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n) || ts.isJsxFragment(n)) {
        hasJSX = true;
      }
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return hasJSX;
  }

  /**
   * Get the name of a function-like node
   */
  private getNodeName(node: ts.Node): string | null {
    if (ts.isFunctionDeclaration(node) && node.name) {
      return node.name.text;
    }
    
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      return node.name.text;
    }
    
    if (ts.isFunctionExpression(node) && node.name) {
      return node.name.text;
    }
    
    return null;
  }

  /**
   * Check if a function is built-in
   */
  private isBuiltInFunction(name: string): boolean {
    const builtIns = [
      'console', 'Math', 'JSON', 'Array', 'Object', 'String', 'Number',
      'Date', 'RegExp', 'Promise', 'Set', 'Map', 'WeakMap', 'WeakSet'
    ];
    return builtIns.some(builtIn => name.startsWith(builtIn));
  }

  /**
   * Calculate usage count of a function/component
   */
  calculateUsageCount(node: ts.Node, sourceFile: ts.SourceFile): number {
    let usageCount = 0;
    
    try {
      const name = this.getNodeName(node);
      if (!name) return 0;
      
      // Count references to this function/component in the same file
      const visit = (n: ts.Node) => {
        if (ts.isIdentifier(n) && n.text === name) {
          // Check if this is a usage, not a declaration
          if (n.parent) {
            if (ts.isCallExpression(n.parent) && n.parent.expression === n) {
              usageCount++; // Function call
            } else if (ts.isPropertyAccessExpression(n.parent) && n.parent.name === n) {
              usageCount++; // Property access
            } else if (ts.isExportSpecifier(n.parent) && n.parent.name === n) {
              // This is an export, not a usage
            } else if (ts.isImportSpecifier(n.parent) && n.parent.name === n) {
              // This is an import, not a usage
            } else if (ts.isVariableDeclaration(n.parent) && n.parent.name === n) {
              // This is a declaration, not a usage
            } else if (ts.isFunctionDeclaration(n.parent) && n.parent.name === n) {
              // This is a declaration, not a usage
            } else {
              usageCount++; // Other usage
            }
          }
        }
        ts.forEachChild(n, visit);
      };
      
      visit(sourceFile);
      
      // Subtract 1 if this is a declaration (to avoid counting self-reference)
      if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
        usageCount = Math.max(0, usageCount - 1);
      }
      
    } catch (error) {
      // Fallback to 0
      usageCount = 0;
    }
    
    return usageCount;
  }
}
