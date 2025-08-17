import * as ts from 'typescript';
import { CodePattern, PatternType, PatternMetadata, ExportInfo } from './types';

/**
 * Pattern Extractor - Pure function that extracts patterns from AST nodes
 * Single Responsibility: Only extracts patterns, no type resolution or semantic analysis
 */
export class PatternExtractor {
  
  /**
   * Extract all patterns from a TypeScript source file
   */
  extractPatterns(sourceFile: ts.SourceFile): CodePattern[] {
    const patterns: CodePattern[] = [];
    
    const visit = (node: ts.Node) => {
      // Extract function patterns
      if (ts.isFunctionDeclaration(node)) {
        const pattern = this.extractFunctionPattern(node, sourceFile);
        if (pattern) patterns.push(pattern);
      }
      
      // Extract variable declarations that might be functions
      if (ts.isVariableStatement(node)) {
        node.declarationList.declarations.forEach(decl => {
          if (decl.initializer && (ts.isFunctionExpression(decl.initializer) || ts.isArrowFunction(decl.initializer))) {
            const pattern = this.extractFunctionPattern(decl, sourceFile);
            if (pattern) patterns.push(pattern);
          }
        });
      }
      
      // Extract standalone function expressions and arrow functions
      if (ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
        const pattern = this.extractFunctionPattern(node, sourceFile);
        if (pattern) patterns.push(pattern);
      }
      
      // Extract interface declarations
      if (ts.isInterfaceDeclaration(node)) {
        const pattern = this.extractInterfacePattern(node, sourceFile);
        if (pattern) patterns.push(pattern);
      }
      
      // Extract type aliases
      if (ts.isTypeAliasDeclaration(node)) {
        const pattern = this.extractTypePattern(node, sourceFile);
        if (pattern) patterns.push(pattern);
      }
      
      // Extract class declarations
      if (ts.isClassDeclaration(node)) {
        const pattern = this.extractClassPattern(node, sourceFile);
        if (pattern) patterns.push(pattern);
      }
      
      // Extract method declarations in classes
      if (ts.isMethodDeclaration(node)) {
        const pattern = this.extractMethodPattern(node, sourceFile);
        if (pattern) patterns.push(pattern);
      }
      
      // Extract call expressions for React patterns
      if (ts.isCallExpression(node)) {
        const pattern = this.extractCallExpressionPattern(node, sourceFile);
        if (pattern) patterns.push(pattern);
      }
      
      // Continue visiting child nodes
      ts.forEachChild(node, visit);
    };
    
    visit(sourceFile);
    return patterns;
  }

  /**
   * Extract function pattern - focused only on pattern detection
   */
  private extractFunctionPattern(node: ts.Node, sourceFile: ts.SourceFile): CodePattern | null {
    const name = this.getFunctionName(node);
    if (!name) return null;

    const type = this.determineFunctionType(node);
    const location = this.getNodeLocation(node, sourceFile);
    const hash = this.generatePatternHash(node, sourceFile);
    
    // Basic metadata - no type resolution or semantic analysis
    const metadata: PatternMetadata = {
      complexity: 1, // Will be enriched later
      parameters: [], // Will be enriched later
      usageCount: 0, // Will be enriched later
      lastModified: new Date()
    };

    return {
      id: `${name}-${hash}`,
      type,
      name,
      filePath: location.file,
      lineNumber: location.line,
      columnNumber: location.column,
      hash,
      metadata,
      dependencies: [], // Will be enriched later
      exports: [] // Will be enriched later
    };
  }

  /**
   * Extract interface pattern
   */
  private extractInterfacePattern(node: ts.InterfaceDeclaration, sourceFile: ts.SourceFile): CodePattern | null {
    const name = node.name.text;
    const location = this.getNodeLocation(node, sourceFile);
    const hash = this.generatePatternHash(node, sourceFile);
    
    const metadata: PatternMetadata = {
      complexity: 1,
      parameters: [],
      usageCount: 0,
      lastModified: new Date()
    };

    return {
      id: `${name}-${hash}`,
      type: 'interface',
      name,
      filePath: location.file,
      lineNumber: location.line,
      columnNumber: location.column,
      hash,
      metadata,
      dependencies: [],
      exports: []
    };
  }

  /**
   * Extract type alias pattern
   */
  private extractTypePattern(node: ts.TypeAliasDeclaration, sourceFile: ts.SourceFile): CodePattern | null {
    const name = node.name.text;
    const location = this.getNodeLocation(node, sourceFile);
    const hash = this.generatePatternHash(node, sourceFile);
    
    const metadata: PatternMetadata = {
      complexity: 1,
      parameters: [],
      usageCount: 0,
      lastModified: new Date()
    };

    return {
      id: `${name}-${hash}`,
      type: 'type-definition',
      name,
      filePath: location.file,
      lineNumber: location.line,
      columnNumber: location.column,
      hash,
      metadata,
      dependencies: [],
      exports: []
    };
  }

  /**
   * Extract class pattern
   */
  private extractClassPattern(node: ts.ClassDeclaration, sourceFile: ts.SourceFile): CodePattern | null {
    const name = node.name?.text;
    if (!name) return null;

    const location = this.getNodeLocation(node, sourceFile);
    const hash = this.generatePatternHash(node, sourceFile);
    const type: PatternType = this.isReactClassComponent(node) ? 'react-component' : 'utility-function';
    
    const metadata: PatternMetadata = {
      complexity: 1,
      parameters: [],
      usageCount: 0,
      lastModified: new Date()
    };

    return {
      id: `${name}-${hash}`,
      type,
      name,
      filePath: location.file,
      lineNumber: location.line,
      columnNumber: location.column,
      hash,
      metadata,
      dependencies: [],
      exports: []
    };
  }

  /**
   * Extract method pattern
   */
  private extractMethodPattern(node: ts.MethodDeclaration, sourceFile: ts.SourceFile): CodePattern | null {
    const name = this.getNodeName(node);
    if (!name) return null;

    const location = this.getNodeLocation(node, sourceFile);
    const hash = this.generatePatternHash(node, sourceFile);
    
    const metadata: PatternMetadata = {
      complexity: 1,
      parameters: [],
      usageCount: 0,
      lastModified: new Date()
    };

    return {
      id: `${name}-${hash}`,
      type: 'utility-function',
      name,
      filePath: location.file,
      lineNumber: location.line,
      columnNumber: location.column,
      hash,
      metadata,
      dependencies: [],
      exports: []
    };
  }

  /**
   * Extract call expression patterns (HOCs, React.memo, forwardRef, etc.)
   */
  private extractCallExpressionPattern(node: ts.CallExpression, sourceFile: ts.SourceFile): CodePattern | null {
    if (!ts.isIdentifier(node.expression)) return null;
    
    const functionName = node.expression.text;
    let patternType: PatternType = 'utility-function';
    let componentName = '';
    
    // Detect React.memo pattern
    if (functionName === 'memo' && node.arguments.length > 0) {
      const firstArg = node.arguments[0];
      if (firstArg && ts.isIdentifier(firstArg)) {
        componentName = firstArg.text;
        patternType = 'react-component';
      } else if (firstArg && (ts.isFunctionExpression(firstArg) || ts.isArrowFunction(firstArg))) {
        componentName = this.getFunctionName(firstArg) || 'AnonymousMemoComponent';
        patternType = 'react-component';
      }
    }
    
    // Detect forwardRef pattern
    else if (functionName === 'forwardRef' && node.arguments.length > 0) {
      const firstArg = node.arguments[0];
      if (firstArg && (ts.isFunctionExpression(firstArg) || ts.isArrowFunction(firstArg))) {
        componentName = this.getFunctionName(firstArg) || 'AnonymousForwardRefComponent';
        patternType = 'react-component';
      }
    }
    
    // Detect higher-order component patterns
    else if (this.isHigherOrderComponent(functionName, node)) {
      componentName = this.extractHOCComponentName(node) || 'AnonymousHOCComponent';
      patternType = 'react-component';
    }
    
    // Only create pattern for recognized React patterns
    if (patternType === 'react-component' && componentName) {
      const location = this.getNodeLocation(node, sourceFile);
      const hash = this.generatePatternHash(node, sourceFile);
      
      const metadata: PatternMetadata = {
        complexity: 1,
        parameters: [],
        usageCount: 0,
        lastModified: new Date()
      };

      return {
        id: `${componentName}-${hash}`,
        type: patternType,
        name: componentName,
        filePath: location.file,
        lineNumber: location.line,
        columnNumber: location.column,
        hash,
        metadata,
        dependencies: [],
        exports: []
      };
    }
    
    return null;
  }

  // Helper methods - focused only on pattern extraction

  private getFunctionName(node: ts.Node): string | null {
    if (ts.isFunctionDeclaration(node) && node.name) {
      return node.name.text;
    }
    
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      return node.name.text;
    }
    
    if (ts.isFunctionExpression(node) && node.name) {
      return node.name.text;
    }
    
    if (ts.isArrowFunction(node)) {
      // Try to get name from parent context
      if (node.parent && ts.isVariableDeclaration(node.parent) && ts.isIdentifier(node.parent.name)) {
        return node.parent.name.text;
      }
    }
    
    return null;
  }

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

  private getNodeLocation(node: ts.Node, sourceFile: ts.SourceFile): { file: string; line: number; column: number } {
    try {
      const start = node.getStart();
      if (start !== undefined) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(start);
        return {
          file: sourceFile.fileName,
          line: line + 1,
          column: character + 1
        };
      }
    } catch (error) {
      // Fallback to default location
    }
    
    return {
      file: sourceFile.fileName,
      line: 1,
      column: 1
    };
  }

  private determineFunctionType(node: ts.Node): PatternType {
    const name = this.getFunctionName(node);
    if (!name) return 'utility-function';

    // Check for React component patterns
    if (name.match(/^[A-Z][a-zA-Z]*$/)) {
      return 'react-component';
    }

    // Check for custom hook patterns
    if (name.startsWith('use') && name.length > 3) {
      return 'custom-hook';
    }

    return 'utility-function';
  }

  private isReactClassComponent(node: ts.ClassDeclaration): boolean {
    // Simple check - if it has JSX in methods, it's likely a React component
    // This will be enhanced by the semantic analyzer later
    return false;
  }

  private isHigherOrderComponent(functionName: string, node: ts.CallExpression): boolean {
    const hocNames = ['withRouter', 'withStyles', 'withTheme', 'withTranslation', 'connect', 'inject', 'observer'];
    return hocNames.includes(functionName) || functionName.startsWith('with');
  }

  private extractHOCComponentName(node: ts.CallExpression): string | null {
    if (node.arguments.length === 0) return null;
    
    const firstArg = node.arguments[0];
    if (firstArg && ts.isIdentifier(firstArg)) {
      return firstArg.text;
    } else if (firstArg && (ts.isFunctionExpression(firstArg) || ts.isArrowFunction(firstArg))) {
      return this.getFunctionName(firstArg);
    }
    
    return null;
  }

  private generatePatternHash(node: ts.Node, sourceFile: ts.SourceFile): string {
    const content = node.getText(sourceFile);
    const location = this.getNodeLocation(node, sourceFile);
    
    // Simple hash based on content and location
    let hash = 0;
    const str = `${content}-${location.file}-${location.line}-${location.column}`;
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36);
  }
}
