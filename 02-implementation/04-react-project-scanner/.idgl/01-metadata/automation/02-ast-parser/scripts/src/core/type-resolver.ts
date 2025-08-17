import * as ts from 'typescript';
import { CodePattern, PatternMetadata, ParameterInfo } from './types';

/**
 * Type Resolver - Focused on TypeScript type information only
 * Single Responsibility: Only resolves types, no pattern extraction or semantic analysis
 */
export class TypeResolver {
  private typeChecker: ts.TypeChecker;

  constructor(typeChecker: ts.TypeChecker) {
    this.typeChecker = typeChecker;
  }

  /**
   * Enrich a pattern with type information
   */
  enrich(pattern: CodePattern, node: ts.Node): CodePattern {
    const enrichedMetadata = { ...pattern.metadata };
    
    // Resolve type information based on pattern type
    switch (pattern.type) {
      case 'react-component':
      case 'custom-hook':
      case 'utility-function':
        enrichedMetadata.parameters = this.resolveParameters(node);
        enrichedMetadata.returnType = this.resolveReturnType(node);
        enrichedMetadata.genericTypes = this.resolveGenerics(node);
        break;
      
      case 'interface':
        enrichedMetadata.propTypes = this.resolveInterfaceProperties(node as ts.InterfaceDeclaration);
        enrichedMetadata.genericTypes = this.resolveGenerics(node);
        break;
      
      case 'type-definition':
        enrichedMetadata.genericTypes = this.resolveGenerics(node);
        break;
    }

    return {
      ...pattern,
      metadata: enrichedMetadata
    };
  }

  /**
   * Resolve function parameters with type information
   */
  private resolveParameters(node: ts.Node): ParameterInfo[] {
    if (!ts.isFunctionLike(node) || !node.parameters) {
      return [];
    }

    return node.parameters.map(param => {
      let name = 'param';
      let type = 'any';
      let required = true;

      // Get parameter name
      if (param.name) {
        if (ts.isIdentifier(param.name)) {
          name = param.name.text;
        } else if (ts.isObjectBindingPattern(param.name)) {
          name = 'object';
        } else if (ts.isArrayBindingPattern(param.name)) {
          name = 'array';
        }
      }

      // Get parameter type
      if (param.type) {
        type = this.typeToString(this.typeChecker.getTypeFromTypeNode(param.type));
      }

      // Check if parameter is optional
      if (param.questionToken) {
        required = false;
      }

      return { name, type, required };
    });
  }

  /**
   * Resolve function return type
   */
  private resolveReturnType(node: ts.Node): string {
    if (!ts.isFunctionLike(node)) {
      return 'any';
    }

    try {
      if (node.type) {
        return this.typeToString(this.typeChecker.getTypeFromTypeNode(node.type));
      }

      // For functions without explicit return type, try to infer from body
      if (node.body) {
        return this.inferReturnTypeFromBody(node.body);
      }

      return 'any';
    } catch (error) {
      return 'any';
    }
  }

  /**
   * Resolve generic type constraints
   */
  private resolveGenerics(node: ts.Node): string[] {
    if (!ts.isFunctionLike(node) && !ts.isInterfaceDeclaration(node) && !ts.isTypeAliasDeclaration(node)) {
      return [];
    }

    const generics: string[] = [];

    try {
      if (node.typeParameters) {
        node.typeParameters.forEach(tp => {
          generics.push(tp.name.text);
        });
      }
    } catch (error) {
      // Fallback to empty array
    }

    return generics;
  }

  /**
   * Resolve interface properties
   */
  private resolveInterfaceProperties(node: ts.InterfaceDeclaration): Record<string, string> {
    const properties: Record<string, string> = {};

    try {
      node.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name) {
          const propertyName = ts.isIdentifier(member.name) ? member.name.text : member.name.getText();
          const propertyType = member.type ? this.typeToString(this.typeChecker.getTypeFromTypeNode(member.type)) : 'any';
          
          properties[propertyName] = propertyType;
        }
      });
    } catch (error) {
      // Fallback to empty properties
    }

    return properties;
  }

  /**
   * Infer return type from function body
   */
  private inferReturnTypeFromBody(body: ts.FunctionBody | ts.Expression): string {
    try {
      if (ts.isBlock(body)) {
        // Check for return statements
        const returnStatements = this.findReturnStatements(body);
        
        if (returnStatements.length === 0) {
          return 'void';
        }

        // Analyze return types
        const returnTypes = returnStatements.map(stmt => {
          if (stmt.expression) {
            return this.typeToString(this.typeChecker.getTypeAtLocation(stmt.expression));
          }
          return 'void';
        });

        // If all return types are the same, use that
        if (returnTypes.every(type => type === returnTypes[0])) {
          return returnTypes[0];
        }

        // If different types, create union type
        const uniqueTypes = [...new Set(returnTypes)];
        return uniqueTypes.join(' | ');
      } else if (ts.isExpression(body)) {
        // Arrow function with expression body
        return this.typeToString(this.typeChecker.getTypeAtLocation(body));
      }

      return 'any';
    } catch (error) {
      return 'any';
    }
  }

  /**
   * Find all return statements in a function body
   */
  private findReturnStatements(body: ts.Block): ts.ReturnStatement[] {
    const returnStatements: ts.ReturnStatement[] = [];

    const visit = (node: ts.Node) => {
      if (ts.isReturnStatement(node)) {
        returnStatements.push(node);
      }
      ts.forEachChild(node, visit);
    };

    visit(body);
    return returnStatements;
  }

  /**
   * Convert TypeScript type to string representation
   */
  private typeToString(type: ts.Type): string {
    try {
      return this.typeChecker.typeToString(type);
    } catch (error) {
      return 'any';
    }
  }

  /**
   * Check if a node has JSX return type
   */
  hasJSXReturn(node: ts.Node): boolean {
    if (!ts.isFunctionLike(node)) {
      return false;
    }

    try {
      // Check return type annotation
      if (node.type) {
        const returnType = this.typeChecker.getTypeFromTypeNode(node.type);
        const typeString = this.typeChecker.typeToString(returnType);
        return typeString.includes('JSX') || typeString.includes('ReactElement');
      }

      // Check function body for JSX
      if (node.body) {
        return this.containsJSX(node.body);
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if a node contains JSX
   */
  private containsJSX(node: ts.Node): boolean {
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
   * Get detailed type information for a node
   */
  getDetailedTypeInfo(node: ts.Node): {
    type: string;
    isUnion: boolean;
    isGeneric: boolean;
    baseType: string;
    genericArguments: string[];
  } {
    try {
      const type = this.typeChecker.getTypeAtLocation(node);
      const typeString = this.typeChecker.typeToString(type);
      
      return {
        type: typeString,
        isUnion: typeString.includes(' | '),
        isGeneric: typeString.includes('<') && typeString.includes('>'),
        baseType: this.extractBaseType(typeString),
        genericArguments: this.extractGenericArguments(typeString)
      };
    } catch (error) {
      return {
        type: 'any',
        isUnion: false,
        isGeneric: false,
        baseType: 'any',
        genericArguments: []
      };
    }
  }

  /**
   * Extract base type from complex type string
   */
  private extractBaseType(typeString: string): string {
    // Remove generic arguments
    const baseType = typeString.replace(/<[^>]*>/g, '');
    
    // Remove union types
    const parts = baseType.split(' | ');
    return parts[0].trim();
  }

  /**
   * Extract generic arguments from type string
   */
  private extractGenericArguments(typeString: string): string[] {
    const match = typeString.match(/<([^>]*)>/);
    if (!match) {
      return [];
    }

    const genericPart = match[1];
    return genericPart.split(',').map(arg => arg.trim());
  }
}
