import * as ts from 'typescript';
import { CodePattern, ExportInfo } from './types';

/**
 * Export Tracker - Handles export/import relationships separately
 * Single Responsibility: Only tracks exports and imports, no pattern extraction or analysis
 */
export class ExportTracker {
  
  /**
   * Track exports from a source file
   */
  trackExports(sourceFile: ts.SourceFile): ExportInfo[] {
    const exports: ExportInfo[] = [];
    
    const visit = (node: ts.Node) => {
      // Track export declarations
      if (ts.isExportDeclaration(node)) {
        if (node.exportClause && ts.isNamedExports(node.exportClause)) {
          node.exportClause.elements.forEach(element => {
            if (ts.isExportSpecifier(element)) {
              const exportName = element.name.text;
              const propertyName = element.propertyName?.text || exportName;
              
              exports.push({
                type: 'named',
                name: exportName,
                path: this.getExportPath(node),
                isReExport: node.moduleSpecifier !== undefined
              });
            }
          });
        }
      }
      
      // Track export assignments
      if (ts.isExportAssignment(node)) {
        exports.push({
          type: 'default',
          name: 'default',
          path: null,
          isReExport: false
        });
      }
      
      // Track exported declarations
      if (this.isExportedDeclaration(node)) {
        const name = this.getDeclarationName(node);
        if (name) {
          exports.push({
            type: 'named',
            name,
            path: null,
            isReExport: false
          });
        }
      }
      
      ts.forEachChild(node, visit);
    };
    
    visit(sourceFile);
    return exports;
  }

  /**
   * Track imports from a source file
   */
  trackImports(sourceFile: ts.SourceFile): string[] {
    const imports: string[] = [];
    
    const visit = (node: ts.Node) => {
      if (ts.isImportDeclaration(node)) {
        const moduleSpecifier = node.moduleSpecifier;
        if (ts.isStringLiteral(moduleSpecifier)) {
          imports.push(moduleSpecifier.text);
        }
      }
      ts.forEachChild(node, visit);
    };
    
    visit(sourceFile);
    return imports;
  }

  /**
   * Build dependency graph from patterns
   */
  buildDependencyGraph(patterns: CodePattern[]): Map<string, string[]> {
    const dependencyGraph = new Map<string, string[]>();
    
    patterns.forEach(pattern => {
      const dependencies = pattern.dependencies || [];
      if (dependencies.length > 0) {
        dependencyGraph.set(pattern.id, dependencies);
      }
    });
    
    return dependencyGraph;
  }

  /**
   * Enrich a pattern with export information
   */
  enrichWithExportInfo(pattern: CodePattern, node: ts.Node, sourceFile: ts.SourceFile): CodePattern {
    const exportInfo = this.getExportInfoForNode(node, sourceFile);
    
    return {
      ...pattern,
      exports: exportInfo
    };
  }

  /**
   * Get export information for a specific node
   */
  private getExportInfoForNode(node: ts.Node, sourceFile: ts.SourceFile): ExportInfo[] {
    const exports: ExportInfo[] = [];
    
    // Check if the node itself is exported
    if (this.isExportedDeclaration(node)) {
      const name = this.getDeclarationName(node);
      if (name) {
        exports.push({
          type: 'named',
          name,
          path: null,
          isReExport: false
        });
      }
    }
    
    // Check for export statements that reference this node
    const nodeName = this.getDeclarationName(node);
    if (nodeName) {
      const visit = (n: ts.Node) => {
        if (ts.isExportDeclaration(n)) {
          if (n.exportClause && ts.isNamedExports(n.exportClause)) {
            n.exportClause.elements.forEach(element => {
              if (ts.isExportSpecifier(element)) {
                const exportName = element.name.text;
                const propertyName = element.propertyName?.text || exportName;
                
                if (exportName === nodeName || propertyName === nodeName) {
                  exports.push({
                    type: 'named',
                    name: exportName,
                    path: this.getExportPath(n),
                    isReExport: n.moduleSpecifier !== undefined
                  });
                }
              }
            });
          }
        }
        
        // Check for export default
        if (ts.isExportAssignment(n)) {
          if (n.expression === node) {
            exports.push({
              type: 'default',
              name: 'default',
              path: null,
              isReExport: false
            });
          }
        }
        
        ts.forEachChild(n, visit);
      };
      
      visit(sourceFile);
    }
    
    return exports;
  }

  /**
   * Check if a declaration is exported
   */
  private isExportedDeclaration(node: ts.Node): boolean {
    if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || 
        ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) ||
        ts.isVariableDeclaration(node)) {
      
      if (ts.canHaveModifiers(node)) {
        const modifiers = ts.getCombinedModifierFlags(node);
        if ((modifiers & ts.ModifierFlags.Export) !== 0) {
          return true;
        }
      }
    }
    
    return false;
  }

  /**
   * Get the name of a declaration
   */
  private getDeclarationName(node: ts.Node): string | null {
    if (ts.isFunctionDeclaration(node) && node.name) {
      return node.name.text;
    }
    
    if (ts.isClassDeclaration(node) && node.name) {
      return node.name.text;
    }
    
    if (ts.isInterfaceDeclaration(node)) {
      return node.name.text;
    }
    
    if (ts.isTypeAliasDeclaration(node)) {
      return node.name.text;
    }
    
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      return node.name.text;
    }
    
    return null;
  }

  /**
   * Get the export path from an export declaration
   */
  private getExportPath(node: ts.ExportDeclaration): string | null {
    if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      return node.moduleSpecifier.text;
    }
    return null;
  }

  /**
   * Check if a pattern is a default export
   */
  isDefaultExport(pattern: CodePattern): boolean {
    return pattern.exports.some(exp => exp.type === 'default');
  }

  /**
   * Check if a pattern is a named export
   */
  isNamedExport(pattern: CodePattern): boolean {
    return pattern.exports.some(exp => exp.type === 'named');
  }

  /**
   * Check if a pattern is re-exported
   */
  isReExported(pattern: CodePattern): boolean {
    return pattern.exports.some(exp => exp.isReExport);
  }

  /**
   * Get all export names for a pattern
   */
  getExportNames(pattern: CodePattern): string[] {
    return pattern.exports.map(exp => exp.name).filter(Boolean) as string[];
  }

  /**
   * Get export paths for a pattern
   */
  getExportPaths(pattern: CodePattern): string[] {
    return pattern.exports.map(exp => exp.path).filter(Boolean) as string[];
  }

  /**
   * Find patterns that export a specific name
   */
  findPatternsByExportName(patterns: CodePattern[], exportName: string): CodePattern[] {
    return patterns.filter(pattern => 
      pattern.exports.some(exp => exp.name === exportName)
    );
  }

  /**
   * Find patterns that import from a specific module
   */
  findPatternsByImportPath(patterns: CodePattern[], importPath: string): CodePattern[] {
    return patterns.filter(pattern => 
      pattern.dependencies.includes(importPath)
    );
  }

  /**
   * Build a reverse dependency map (what imports what)
   */
  buildReverseDependencyMap(patterns: CodePattern[]): Map<string, string[]> {
    const reverseMap = new Map<string, string[]>();
    
    patterns.forEach(pattern => {
      pattern.dependencies.forEach(dependency => {
        if (!reverseMap.has(dependency)) {
          reverseMap.set(dependency, []);
        }
        reverseMap.get(dependency)!.push(pattern.id);
      });
    });
    
    return reverseMap;
  }

  /**
   * Calculate export complexity for a pattern
   */
  calculateExportComplexity(pattern: CodePattern): number {
    let complexity = 0;
    
    // Multiple exports increase complexity
    if (pattern.exports.length > 1) {
      complexity += pattern.exports.length;
    }
    
    // Re-exports increase complexity
    if (pattern.exports.some(exp => exp.isReExport)) {
      complexity += 2;
    }
    
    // Different export types increase complexity
    const exportTypes = new Set(pattern.exports.map(exp => exp.type));
    if (exportTypes.size > 1) {
      complexity += exportTypes.size;
    }
    
    return complexity;
  }
}
