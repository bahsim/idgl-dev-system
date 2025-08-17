import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { CodePattern, ParseOptions, ParseResult, ParseError, ParseStats, PatternType } from '../types';

/**
 * High-Quality AST Parser using TypeScript Compiler API
 * Provides superior type resolution and semantic analysis for React TypeScript codebases
 */
export class TypeScriptASTParser {
  private options: ParseOptions;
  private program: ts.Program | null = null;
  private typeChecker: ts.TypeChecker | null = null;
  private startTime: number = 0;
  private totalPatterns: number = 0;

  constructor(options: ParseOptions) {
    this.options = options;
  }

  /**
   * Parse a single project directory using TypeScript Compiler API
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

      // Get source files
      const allSourceFiles = this.program.getSourceFiles();
      console.log(`📁 Total source files in program: ${allSourceFiles.length}`);
      
      // Filter source files to only include those in our project directory
      const sourceFiles = allSourceFiles.filter(file => {
        if (file.isDeclarationFile) return false;
        
        // Normalize paths for comparison
        const normalizedFileName = file.fileName.replace(/\\/g, '/');
        const normalizedProjectPath = projectPath.replace(/\\/g, '/');
        
        // Check if file is within our project directory OR is a test file in the project
        const isInProject = normalizedFileName.includes(normalizedProjectPath);
        const isTestFile = normalizedFileName.includes('test-') || normalizedFileName.includes('.test.') || normalizedFileName.includes('.spec.');
        
        return isInProject || isTestFile;
      });
      
      console.log(`📁 Filtered source files for project: ${sourceFiles.length}`);

      const patterns: CodePattern[] = [];
      const errors: ParseError[] = [];
      let processedFiles = 0;

      // Process each source file
      for (const sourceFile of sourceFiles) {
        try {
          const filePatterns = this.extractPatternsFromFile(sourceFile);
          patterns.push(...filePatterns);
          processedFiles++;
        } catch (error) {
          console.error(`❌ Error processing file: ${error}`);
          errors.push({
            filePath: sourceFile.fileName,
            message: error instanceof Error ? error.message : 'Unknown error',
            lineNumber: 0,
            severity: 'error'
          });
        }
      }

      const endTime = Date.now();
      const endMemory = process.memoryUsage().heapUsed;
      const processingTime = endTime - this.startTime;
      const memoryUsage = (endMemory - startMemory) / 1024 / 1024; // MB

      // Generate comprehensive quality report
      const qualityReport = this.generateQualityReport(patterns, errors);
      
      if (this.options.verbose) {
        console.log('\n📊 Quality Report:');
        console.log(`  Pattern Detection Rate: ${qualityReport.quality.patternDetectionRate.toFixed(1)}%`);
        console.log(`  Type Resolution Accuracy: ${qualityReport.quality.typeResolutionAccuracy.toFixed(1)}%`);
        console.log(`  Semantic Analysis Quality: ${qualityReport.quality.semanticAnalysisQuality.toFixed(1)}%`);
        console.log(`  Cross-File Consistency: ${qualityReport.quality.crossFileConsistency.toFixed(1)}%`);
        console.log(`  Overall Quality: ${qualityReport.quality.overallQuality.toFixed(1)}%`);
        
        if (qualityReport.recommendations.length > 0) {
          console.log('\n💡 Quality Recommendations:');
          qualityReport.recommendations.forEach((rec: string, index: number) => {
            console.log(`  ${index + 1}. ${rec}`);
          });
        }
      }

      return {
        patterns,
        errors,
        stats: {
          totalFiles: sourceFiles.length,
          processedFiles: processedFiles,
          totalPatterns: patterns.length,
          processingTime,
          memoryUsage
        },
        qualityReport
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
        },
        qualityReport: {
          quality: {
            patternDetectionRate: 0,
            typeResolutionAccuracy: 0,
            semanticAnalysisQuality: 0,
            crossFileConsistency: 0,
            overallQuality: 0
          },
          performance: this.calculatePerformanceMetrics(),
          recommendations: [],
          timestamp: new Date().toISOString()
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
        
        // Also include the project path itself for better file discovery
        if (fileNames.length === 0) {
          console.log(`⚠️  No TypeScript files found in project path: ${projectPath}`);
        } else {
          console.log(`📁 Found ${fileNames.length} TypeScript files for program creation`);
          // Log the first few files to verify
          fileNames.slice(0, 5).forEach(file => console.log(`  - ${file}`));
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
              console.log(`🔍 Found source file: ${fullPath}`);
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
   * Extract patterns from a TypeScript source file
   */
  private extractPatternsFromFile(sourceFile: ts.SourceFile): CodePattern[] {
    const patterns: CodePattern[] = [];
    
    // Visit all nodes in the file
    const visit = (node: ts.Node) => {
      // Extract function declarations (more inclusive)
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
      
      // Extract export declarations that might contain functions
      if (ts.isExportDeclaration(node)) {
        if (node.exportClause && ts.isNamedExports(node.exportClause)) {
          node.exportClause.elements.forEach(element => {
            // Check if this export references a function
            const symbol = this.typeChecker?.getSymbolAtLocation(element.name);
            if (symbol) {
              const declarations = symbol.declarations;
              if (declarations) {
                declarations.forEach(decl => {
                  if (ts.isFunctionLike(decl)) {
                    const pattern = this.extractFunctionPattern(decl, sourceFile);
                    if (pattern) patterns.push(pattern);
                  }
                });
              }
            }
          });
        }
      }
      
      // Extract import declarations to track dependencies
      if (ts.isImportDeclaration(node)) {
        // Track imports for dependency analysis
        this.trackImportDependencies(node, sourceFile);
      }
      
      // Continue visiting child nodes
      ts.forEachChild(node, visit);
    };
    
    visit(sourceFile);
    return patterns;
  }

  /**
   * Track import dependencies for better analysis
   */
  private trackImportDependencies(node: ts.ImportDeclaration, sourceFile: ts.SourceFile): void {
    // This method tracks imports for dependency analysis
    // Implementation can be expanded later for better dependency tracking
  }

  /**
   * Extract function pattern with more inclusive detection
   */
  private extractFunctionPattern(node: ts.Node, sourceFile: ts.SourceFile): CodePattern | null {
    let functionName = '';
    let functionType: PatternType = 'utility-function';
    let parameters: any[] = [];
    let returnType = 'any';
    let isExported = false;

    // Handle different function patterns more inclusively
    if (ts.isFunctionDeclaration(node)) {
      if (node.name) {
        functionName = node.name.text;
        parameters = this.extractParameters(node);
        // FunctionDeclaration doesn't have returnType property
        returnType = 'any';
        isExported = this.isExported(node);
      }
    } else if (ts.isVariableDeclaration(node)) {
      if (node.name && ts.isIdentifier(node.name)) {
        functionName = node.name.text;
        if (node.initializer) {
          if (ts.isFunctionExpression(node.initializer) || ts.isArrowFunction(node.initializer)) {
            parameters = this.extractParameters(node.initializer);
            // These don't have returnType property either
            returnType = 'any';
          }
        }
        isExported = this.isExported(node);
      }
    } else if (ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
      // For anonymous functions, try to get name from parent context
      functionName = this.getFunctionNameFromContext(node, sourceFile) || 'anonymous';
      parameters = this.extractParameters(node);
      // These don't have returnType property
      returnType = 'any';
      isExported = this.isExported(node);
    } else if (ts.isMethodDeclaration(node)) {
      functionName = this.getNodeName(node) || 'method';
      parameters = this.extractParameters(node);
      // MethodDeclaration doesn't have returnType property
      returnType = 'any';
      isExported = false; // Methods are not directly exported
    }

    if (!functionName) {
      return null;
    }

    // Determine function type more inclusively
    functionType = this.determineFunctionType(node);
    
    // Create pattern with enhanced metadata
    const location = this.getNodeLocation(node, sourceFile);
    const types = this.extractTypeInformation(node);
    const semantic = this.analyzeSemantics(node);
    const exportDetails = this.getExportDetails(node);
    const hash = this.generatePatternHash(node, sourceFile);

    const metadata: any = {
      complexity: semantic.complexity,
      parameters: types.parameters && types.parameters.length > 0 ? types.parameters : parameters,
      returnType: types.returnType && types.returnType !== 'any' ? types.returnType : returnType,
      isExported: exportDetails.isExported,
      isDefault: exportDetails.exportType === 'default',
      exportType: exportDetails.exportType,
      exportName: exportDetails.exportName,
      exportPath: exportDetails.exportPath,
      isReExported: exportDetails.isReExported,
      jsxReturnType: this.hasJSXReturn(node),
      genericTypes: types.genericConstraints && types.genericConstraints.length > 0 ? types.genericConstraints.map((g: any) => g.name) : [],
      propTypes: this.extractPropTypes(node),
      usageCount: this.calculateUsageCount(node, sourceFile),
      lastModified: this.getLastModified(node, sourceFile),
      // Enhanced semantic analysis
      purpose: semantic.purpose,
      architecturalMetrics: semantic.architecturalMetrics,
      dependencies: semantic.dependencies
    };

    return {
      id: `${functionName}-${hash}`,
      type: functionType,
      name: functionName,
      filePath: location.file,
      lineNumber: location.line,
      columnNumber: location.column,
      hash,
      metadata,
      dependencies: semantic.dependencies,
      exports: exportDetails.isExported ? [{
        type: exportDetails.exportType,
        name: exportDetails.exportName,
        path: exportDetails.exportPath,
        isReExport: exportDetails.isReExported
      }] : []
    };
  }

  /**
   * Get function name from context when function is anonymous
   */
  private getFunctionNameFromContext(node: ts.FunctionExpression | ts.ArrowFunction, sourceFile: ts.SourceFile): string | null {
    // Try to get name from parent context
    if (node.parent) {
      if (ts.isVariableDeclaration(node.parent) && node.parent.name && ts.isIdentifier(node.parent.name)) {
        return node.parent.name.text;
      }
      if (ts.isPropertyAssignment(node.parent) && node.parent.name && ts.isIdentifier(node.parent.name)) {
        return node.parent.name.text;
      }
      if (ts.isPropertyDeclaration(node.parent) && node.parent.name && ts.isIdentifier(node.parent.name)) {
        return node.parent.name.text;
      }
    }
    return null;
  }

  /**
   * Extract function parameters - correct TypeScript AST approach
   */
  private extractParameters(node: ts.FunctionLikeDeclaration): any[] {
    if (!node.parameters) return [];
    
    return node.parameters.map(param => {
      let name = 'param';
      let type = 'any';
      let required = true;

      // Access the name property directly from ParameterDeclaration
      if (param.name) {
        if (ts.isIdentifier(param.name)) {
          name = param.name.text;
        } else if (ts.isObjectBindingPattern(param.name)) {
          name = 'object';
        } else if (ts.isArrayBindingPattern(param.name)) {
          name = 'array';
        }
      }

      // Check if parameter is optional
      if (param.questionToken) {
        required = false;
      }

      return { name, type, required };
    });
  }

  /**
   * Extract interface pattern with full type information
   */
  private extractInterfacePattern(node: ts.InterfaceDeclaration, sourceFile: ts.SourceFile): CodePattern | null {
    const name = node.name.text;
    const location = this.getNodeLocation(node, sourceFile);
    
    // Extract interface properties and types
    const types = this.extractInterfaceTypeInformation(node);
    
    const semantic = {
      purpose: 'Data',
      complexity: this.calculateComplexity(node),
      dependencies: this.extractDependencies(node),
      usage: []
    };

    const hash = this.generatePatternHash(node, sourceFile);

    const metadata: any = {
      complexity: semantic.complexity,
      parameters: [],
      isExported: this.isExported(node),
      isDefault: false,
      jsxReturnType: false,
      genericTypes: types.genericConstraints?.map((g: any) => g.name) || [],
      propTypes: {},
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
      dependencies: semantic.dependencies,
      exports: []
    };
  }

  /**
   * Extract type alias pattern with full type information
   */
  private extractTypePattern(node: ts.TypeAliasDeclaration, sourceFile: ts.SourceFile): CodePattern | null {
    const name = node.name.text;
    const location = this.getNodeLocation(node, sourceFile);
    
    // Extract type information using TypeScript's type checker
    const types = this.extractTypeAliasTypeInformation(node);
    
    const semantic = {
      purpose: 'Data',
      complexity: this.calculateComplexity(node),
      dependencies: this.extractDependencies(node),
      usage: []
    };

    const hash = this.generatePatternHash(node, sourceFile);

    const metadata: any = {
      complexity: semantic.complexity,
      parameters: [],
      isExported: this.isExported(node),
      isDefault: false,
      jsxReturnType: false,
      genericTypes: types.genericConstraints?.map((g: any) => g.name) || [],
      propTypes: {},
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
      dependencies: semantic.dependencies,
      exports: []
    };
  }

  /**
   * Extract class pattern for React class components
   */
  private extractClassPattern(node: ts.ClassDeclaration, sourceFile: ts.SourceFile): CodePattern | null {
    const name = node.name?.text;
    if (!name) return null;

    const location = this.getNodeLocation(node, sourceFile);
    
    // Check if it's a React component
    const isReactComponent = this.isReactClassComponent(node);
    const type: PatternType = isReactComponent ? 'react-component' : 'utility-function';
    
    const types = this.extractClassTypeInformation(node);
    
    const semantic = {
      purpose: isReactComponent ? 'UI' : 'Logic',
      complexity: this.calculateComplexity(node),
      dependencies: this.extractDependencies(node),
      usage: []
    };

    const hash = this.generatePatternHash(node, sourceFile);

    const metadata: any = {
      complexity: semantic.complexity,
      parameters: [],
      isExported: this.isExported(node),
      isDefault: false,
      jsxReturnType: isReactComponent,
      genericTypes: types.genericConstraints?.map((g: any) => g.name) || [],
      propTypes: {},
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
      dependencies: semantic.dependencies,
      exports: []
    };
  }

  /**
   * Extract class method pattern
   */
  private extractMethodPattern(node: ts.MethodDeclaration, sourceFile: ts.SourceFile): CodePattern | null {
    const name = this.getNodeName(node);
    if (!name) return null;

    const location = this.getNodeLocation(node, sourceFile);
    const types = this.extractTypeInformation(node);
    const semantic = this.analyzeSemantics(node);
    const hash = this.generatePatternHash(node, sourceFile);

    const metadata: any = {
      complexity: semantic.complexity,
      parameters: types.parameters || [],
      returnType: types.returnType,
      isExported: false, // Methods are not directly exported
      isDefault: false,
      jsxReturnType: this.hasJSXReturn(node),
      genericTypes: types.genericConstraints?.map((g: any) => g.name) || [],
      propTypes: {},
      usageCount: 0,
      lastModified: new Date(),
      // Enhanced semantic analysis
      purpose: semantic.purpose,
      architecturalMetrics: semantic.architecturalMetrics,
      dependencies: semantic.dependencies,
      // Method-specific metadata
      isStatic: node.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword) || false,
      isPrivate: node.modifiers?.some(m => m.kind === ts.SyntaxKind.PrivateKeyword) || false,
      isProtected: node.modifiers?.some(m => m.kind === ts.SyntaxKind.ProtectedKeyword) || false,
      isAbstract: node.modifiers?.some(m => m.kind === ts.SyntaxKind.AbstractKeyword) || false
    };

    return {
      id: `${name}-${hash}`,
      type: 'utility-function', // Class methods are utility functions
      name,
      filePath: location.file,
      lineNumber: location.line,
      columnNumber: location.column,
      hash,
      metadata,
      dependencies: semantic.dependencies,
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
      const semantic = {
        purpose: 'UI',
        complexity: this.calculateComplexity(node),
        dependencies: this.extractDependencies(node),
        usage: []
      };

      const hash = this.generatePatternHash(node, sourceFile);
      
      // Extract type information for HOCs
      const types = this.extractHOCTypeInformation(node);

      const metadata: any = {
        complexity: semantic.complexity,
        parameters: types.parameters || [],
        returnType: types.returnType,
        isExported: this.isExported(node),
        isDefault: false,
        jsxReturnType: true,
        genericTypes: types.genericConstraints || [],
        propTypes: {},
        usageCount: 0,
        lastModified: new Date(),
        hocType: this.getHOCType(functionName),
        wrappedComponent: componentName
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
        dependencies: semantic.dependencies,
        exports: []
      };
    }
    
    return null;
  }

  /**
   * Get function name from function expression or arrow function
   */
  private getFunctionName(node: ts.FunctionExpression | ts.ArrowFunction): string | null {
    if (node.name) return node.name.text;
    
    // Check if it's assigned to a variable
    if (node.parent && ts.isVariableDeclaration(node.parent)) {
      if (ts.isIdentifier(node.parent.name)) {
        return node.parent.name.text;
      }
    }
    
    return null;
  }

  /**
   * Check if function call is a higher-order component
   */
  private isHigherOrderComponent(functionName: string, node: ts.CallExpression): boolean {
    const hocNames = ['withRouter', 'withStyles', 'withTheme', 'withTranslation', 'connect', 'inject', 'observer'];
    return hocNames.includes(functionName) || functionName.startsWith('with') || functionName.startsWith('use');
  }

  /**
   * Extract component name from HOC call
   */
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

  /**
   * Get HOC type classification
   */
  private getHOCType(functionName: string): string {
    if (functionName === 'memo') return 'React.memo';
    if (functionName === 'forwardRef') return 'React.forwardRef';
    if (functionName.startsWith('with')) return 'Custom HOC';
    if (functionName === 'connect') return 'Redux Connect';
    if (functionName === 'observer') return 'MobX Observer';
    return 'Higher-Order Component';
  }

  /**
   * Extract type information for HOC patterns
   */
  private extractHOCTypeInformation(node: ts.CallExpression): any {
    const types: any = {
      parameters: [],
      returnType: 'React.ComponentType',
      genericConstraints: []
    };

    try {
      // Try to extract parameter types
      if (node.arguments.length > 0) {
        const firstArg = node.arguments[0];
        if (firstArg && this.typeChecker) {
          const argType = this.typeChecker.getTypeAtLocation(firstArg);
          if (argType) {
            types.parameters.push({
              name: 'component',
              type: this.typeToString(argType),
              required: true,
              defaultValue: undefined
            });
          }
        }
      }
    } catch (error) {
      // Fallback to default types
    }

    return types;
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
   * Get the location of a node
   */
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

  /**
   * Determine the function type based on naming and usage patterns
   */
  private determineFunctionType(node: ts.Node): PatternType {
    const name = this.getNodeName(node);
    if (!name) return 'utility-function';

    // Check for React component patterns
    if (name.match(/^[A-Z][a-zA-Z]*$/) && this.hasJSXReturn(node)) {
      return 'react-component';
    }

    // Enhanced custom hook detection with complex patterns
    if (this.isCustomHook(name, node)) {
      return 'custom-hook';
    }

    // More inclusive function detection - catch all functions
    if (ts.isFunctionLike(node)) {
      // Check if it's exported (likely a public API)
      if (this.isExported(node)) {
        return 'utility-function'; // Public API functions
      }
      
      // Check if it's a method in a class
      if (ts.isMethodDeclaration(node)) {
        return 'utility-function'; // Class methods
      }
      
      // Check if it's an arrow function or function expression
      if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
        return 'utility-function'; // Inline functions
      }
      
      // Default to utility function for any other function-like node
      return 'utility-function';
    }

    return 'utility-function';
  }

  /**
   * Enhanced custom hook detection with complex patterns
   */
  private isCustomHook(name: string, node: ts.Node): boolean {
    // Basic hook naming convention
    if (!name.startsWith('use') || name.length <= 3) return false;
    
    // Check for hook-specific patterns
    return this.hasHookPatterns(node);
  }

  /**
   * Check for hook-specific patterns in the function
   */
  private hasHookPatterns(node: ts.Node): boolean {
    let hasHookPatterns = false;
    
    const visit = (n: ts.Node) => {
      // Check for useState, useEffect, useContext, etc.
      if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
        const hookName = n.expression.text;
        if (['useState', 'useEffect', 'useContext', 'useRef', 'useMemo', 'useCallback', 'useReducer', 'useLayoutEffect'].includes(hookName)) {
          hasHookPatterns = true;
        }
      }
      
      // Check for conditional hook usage
      if (ts.isIfStatement(n)) {
        if (this.containsHookCall(n.expression)) {
          hasHookPatterns = true;
        }
      } else if (ts.isConditionalExpression(n)) {
        if (this.containsHookCall(n.condition)) {
          hasHookPatterns = true;
        }
      }
      
      // Check for hook calls in loops
      if (ts.isForStatement(n) || ts.isWhileStatement(n) || ts.isDoStatement(n)) {
        if (this.containsHookCall(n)) {
          hasHookPatterns = true;
        }
      }
      
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return hasHookPatterns;
  }

  /**
   * Check if a node contains hook calls
   */
  private containsHookCall(node: ts.Node): boolean {
    let hasHookCall = false;
    
    const visit = (n: ts.Node) => {
      if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
        const hookName = n.expression.text;
        if (hookName.startsWith('use')) {
          hasHookCall = true;
        }
      }
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return hasHookCall;
  }

  /**
   * Determine the specific type of hook
   */
  private determineHookType(node: ts.Node): string {
    let hookTypes: string[] = [];
    
    const visit = (n: ts.Node) => {
      if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
        const hookName = n.expression.text;
        if (hookName === 'useState') hookTypes.push('State');
        else if (hookName === 'useEffect') hookTypes.push('Effect');
        else if (hookName === 'useContext') hookTypes.push('Context');
        else if (hookName === 'useRef') hookTypes.push('Ref');
        else if (hookName === 'useMemo') hookTypes.push('Memo');
        else if (hookName === 'useCallback') hookTypes.push('Callback');
        else if (hookName === 'useReducer') hookTypes.push('Reducer');
        else if (hookName === 'useLayoutEffect') hookTypes.push('LayoutEffect');
        else if (hookName.startsWith('use')) hookTypes.push('Custom');
      }
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    
    if (hookTypes.length === 0) return 'Custom';
    if (hookTypes.length === 1) return hookTypes[0] || 'Custom';
    return `Composite(${hookTypes.join(', ')})`;
  }

  /**
   * Analyze state management patterns in the hook
   */
  private analyzeStateManagement(node: ts.Node): any {
    const analysis = {
      hasState: false,
      hasReducer: false,
      hasRef: false,
      stateTypes: [] as string[],
      stateUpdates: [] as string[]
    };
    
    const visit = (n: ts.Node) => {
      if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
        const hookName = n.expression.text;
        if (hookName === 'useState') {
          analysis.hasState = true;
          if (n.typeArguments && n.typeArguments.length > 0) {
            analysis.stateTypes.push('Generic');
          } else {
            analysis.stateTypes.push('Inferred');
          }
        } else if (hookName === 'useReducer') {
          analysis.hasReducer = true;
          analysis.stateTypes.push('Reducer');
        } else if (hookName === 'useRef') {
          analysis.hasRef = true;
          analysis.stateTypes.push('Ref');
        }
      }
      
      // Look for state update patterns
      if (ts.isBinaryExpression(n) && n.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
        if (ts.isIdentifier(n.left) && n.left.text.includes('set')) {
          analysis.stateUpdates.push('Direct Assignment');
        }
      }
      
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return analysis;
  }

  /**
   * Analyze context usage patterns
   */
  private analyzeContextUsage(node: ts.Node): any {
    const analysis = {
      hasContext: false,
      contextProviders: [] as string[],
      contextConsumers: [] as string[]
    };
    
    const visit = (n: ts.Node) => {
      if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
        const hookName = n.expression.text;
        if (hookName === 'useContext') {
          analysis.hasContext = true;
          if (n.arguments.length > 0) {
            analysis.contextConsumers.push('Consumer');
          }
        }
      }
      
      // Look for context providers
      if (ts.isPropertyAccessExpression(n) && n.name && ts.isIdentifier(n.name)) {
        analysis.contextProviders.push('Provider');
      }
      
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return analysis;
  }

  /**
   * Check if hook has conditional usage
   */
  private hasConditionalHooks(node: ts.Node): boolean {
    let hasConditional = false;
    
    const visit = (n: ts.Node) => {
      if (ts.isIfStatement(n) || ts.isConditionalExpression(n)) {
        if (this.containsHookCall(n)) {
          hasConditional = true;
        }
      }
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return hasConditional;
  }

  /**
   * Extract hook-specific dependencies
   */
  private extractHookDependencies(node: ts.Node): string[] {
    const dependencies: string[] = [];
    
    const visit = (n: ts.Node) => {
      if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
        const hookName = n.expression.text;
        if (hookName === 'useEffect' || hookName === 'useMemo' || hookName === 'useCallback') {
          if (n.arguments.length > 1 && n.arguments[1] && ts.isArrayLiteralExpression(n.arguments[1])) {
            dependencies.push(`${hookName} Dependencies`);
          }
        }
      }
      ts.forEachChild(n, visit);
    };
    
    visit(node);
    return dependencies;
  }

  /**
   * Check if function returns JSX
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
   * Extract comprehensive type information using TypeScript's type checker
   */
  private extractTypeInformation(node: ts.Node): any {
    if (!this.typeChecker) return {};

    try {
      let types: any = {
        returnType: 'any',
        parameters: [],
        genericConstraints: []
      };

      // Handle different function types
      if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
        // These have explicit type information
        if (node.type) {
          types.returnType = this.typeToString(this.typeChecker.getTypeFromTypeNode(node.type));
        }
        
        // Extract parameters with types
        if (node.parameters) {
          types.parameters = node.parameters.map(param => {
            let paramType = 'any';
            if (param.type) {
              paramType = this.typeToString(this.typeChecker!.getTypeFromTypeNode(param.type));
            }
            return {
              name: ts.isIdentifier(param.name) && param.name ? param.name.text : 'param',
              type: paramType,
              required: !param.questionToken,
              defaultValue: undefined
            };
          });
        }
      } else if (ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
        // These might have type annotations
        if (node.type) {
          types.returnType = this.typeToString(this.typeChecker.getTypeFromTypeNode(node.type));
        }
        
        // Extract parameters with types
        if (node.parameters) {
          types.parameters = node.parameters.map(param => {
            let paramType = 'any';
            if (param.type) {
              paramType = this.typeToString(this.typeChecker!.getTypeFromTypeNode(param.type));
            }
            return {
              name: ts.isIdentifier(param.name) && param.name ? param.name.text : 'param',
              type: paramType,
              required: !param.questionToken,
              defaultValue: undefined
            };
          });
        }
      } else if (ts.isVariableDeclaration(node) && node.initializer) {
        // Handle variable declarations with function initializers
        if (ts.isFunctionExpression(node.initializer) || ts.isArrowFunction(node.initializer)) {
          const func = node.initializer;
          if (func.type) {
            types.returnType = this.typeToString(this.typeChecker.getTypeFromTypeNode(func.type));
          }
          
          if (func.parameters) {
            types.parameters = func.parameters.map(param => {
              let paramType = 'any';
              if (param.type) {
                paramType = this.typeToString(this.typeChecker!.getTypeFromTypeNode(param.type));
              }
              return {
                name: ts.isIdentifier(param.name) && param.name ? param.name.text : 'param',
                type: paramType,
                required: !param.questionToken,
                defaultValue: undefined
              };
            });
          }
        }
      }

      // Extract generic information if available
      if (ts.isFunctionLike(node) && node.typeParameters) {
        types.genericConstraints = node.typeParameters.map(tp => ({
          name: tp.name.text,
          constraint: tp.constraint ? this.typeToString(this.typeChecker!.getTypeFromTypeNode(tp.constraint)) : undefined
        }));
      }

      return types;
    } catch (error) {
      return {
        returnType: 'any',
        parameters: [],
        genericConstraints: []
      };
    }
  }

  /**
   * Extract interface type information
   */
  private extractInterfaceTypeInformation(node: ts.InterfaceDeclaration): any {
    const types: any = {
      properties: [],
      extends: [],
      genericConstraints: []
    };

    // Extract properties
    node.members.forEach(member => {
      if (ts.isPropertySignature(member) && member.name) {
        const propertyName = ts.isIdentifier(member.name) ? member.name.text : member.name.getText();
        const propertyType = member.type ? this.typeToString(this.typeChecker!.getTypeFromTypeNode(member.type)) : 'any';
        
        types.properties.push({
          name: propertyName,
          type: propertyType,
          optional: member.questionToken !== undefined
        });
      }
    });

    // Extract extends
    if (node.heritageClauses) {
      node.heritageClauses.forEach(clause => {
        if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
          clause.types.forEach(typeRef => {
            types.extends.push(this.typeToString(this.typeChecker!.getTypeFromTypeNode(typeRef)));
          });
        }
      });
    }

    // Extract generic constraints
    if (node.typeParameters) {
      node.typeParameters.forEach(tp => {
        types.genericConstraints.push({
          name: tp.name.text,
          constraint: tp.constraint ? this.typeToString(this.typeChecker!.getTypeFromTypeNode(tp.constraint)) : undefined
        });
      });
    }

    return types;
  }

  /**
   * Extract type alias type information
   */
  private extractTypeAliasTypeInformation(node: ts.TypeAliasDeclaration): any {
    const types: any = {
      baseType: this.typeToString(this.typeChecker!.getTypeFromTypeNode(node.type)),
      genericConstraints: []
    };

    // Extract generic constraints
    if (node.typeParameters) {
      node.typeParameters.forEach(tp => {
        types.genericConstraints.push({
          name: tp.name.text,
          constraint: tp.constraint ? this.typeToString(this.typeChecker!.getTypeFromTypeNode(tp.constraint)) : undefined
        });
      });
    }

    return types;
  }

  /**
   * Extract class type information
   */
  private extractClassTypeInformation(node: ts.ClassDeclaration): any {
    const types: any = {
      properties: [],
      methods: [],
      extends: [],
      implements: [],
      genericConstraints: []
    };

    // Extract properties and methods
    node.members.forEach(member => {
      if (ts.isPropertyDeclaration(member) && member.name) {
        const propertyName = ts.isIdentifier(member.name) ? member.name.text : member.name.getText();
        const propertyType = member.type ? this.typeToString(this.typeChecker!.getTypeFromTypeNode(member.type)) : 'any';
        
        types.properties.push({
          name: propertyName,
          type: propertyType,
          modifiers: this.getModifiers(member)
        });
      }
      
      if (ts.isMethodDeclaration(member) && member.name) {
        const methodName = ts.isIdentifier(member.name) ? member.name.text : member.name.getText();
        const methodSignature = this.typeChecker!.getSignatureFromDeclaration(member);
        
        if (methodSignature) {
          const returnType = this.typeChecker!.getReturnTypeOfSignature(methodSignature);
          types.methods.push({
            name: methodName,
            returnType: this.typeToString(returnType),
            modifiers: this.getModifiers(member)
          });
        }
      }
    });

    // Extract extends and implements
    if (node.heritageClauses) {
      node.heritageClauses.forEach(clause => {
        if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
          clause.types.forEach(typeRef => {
            types.extends.push(this.typeToString(this.typeChecker!.getTypeFromTypeNode(typeRef)));
          });
        } else if (clause.token === ts.SyntaxKind.ImplementsKeyword) {
          clause.types.forEach(typeRef => {
            types.implements.push(this.typeToString(this.typeChecker!.getTypeFromTypeNode(typeRef)));
          });
        }
      });
    }

    // Extract generic constraints
    if (node.typeParameters) {
      node.typeParameters.forEach(tp => {
        types.genericConstraints.push({
          name: tp.name.text,
          constraint: tp.constraint ? this.typeToString(this.typeChecker!.getTypeFromTypeNode(tp.constraint)) : undefined
        });
      });
    }

    return types;
  }

  /**
   * Convert TypeScript type to string representation
   */
  private typeToString(type: ts.Type): string {
    if (!this.typeChecker) return 'any';
    
    try {
      return this.typeChecker.typeToString(type);
    } catch (error) {
      return 'any';
    }
  }

  /**
   * Check if class is a React component
   */
  private isReactClassComponent(node: ts.ClassDeclaration): boolean {
    // Check if it extends React.Component or has JSX in render method
    if (node.heritageClauses) {
      for (const clause of node.heritageClauses) {
        if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
          for (const typeRef of clause.types) {
            const typeText = this.typeToString(this.typeChecker!.getTypeFromTypeNode(typeRef));
            if (typeText.includes('React.Component') || typeText.includes('Component')) {
              return true;
            }
          }
        }
      }
    }

    // Check for JSX in methods
    return this.hasJSXReturn(node);
  }

  /**
   * Get modifiers from a node
   */
  private getModifiers(node: ts.Node): string[] {
    const modifiers: string[] = [];
    
    // Check if node is a specific declaration type that can have modifiers
    if (ts.canHaveModifiers(node) && 
        (ts.isPropertyDeclaration(node) || ts.isMethodDeclaration(node) || 
         ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) ||
         ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node))) {
      const nodeModifiers = ts.getCombinedModifierFlags(node);
      
      if (nodeModifiers & ts.ModifierFlags.Public) modifiers.push('public');
      if (nodeModifiers & ts.ModifierFlags.Private) modifiers.push('private');
      if (nodeModifiers & ts.ModifierFlags.Protected) modifiers.push('protected');
      if (nodeModifiers & ts.ModifierFlags.Static) modifiers.push('static');
      if (nodeModifiers & ts.ModifierFlags.Readonly) modifiers.push('readonly');
      if (nodeModifiers & ts.ModifierFlags.Abstract) modifiers.push('abstract');
    }
    
    return modifiers;
  }

  /**
   * Check if a node is exported - comprehensive export detection
   */
  private isExported(node: ts.Node): boolean {
    // Check if the node has export modifiers
    if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || 
        ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) ||
        ts.isVariableDeclaration(node) || ts.isMethodDeclaration(node) ||
        ts.isPropertyDeclaration(node)) {
      if (ts.canHaveModifiers(node)) {
        const modifiers = ts.getCombinedModifierFlags(node);
        if ((modifiers & ts.ModifierFlags.Export) !== 0) {
          return true;
        }
      }
    }
    
    // Check for export statements in the same file
    const sourceFile = node.getSourceFile();
    if (!sourceFile) return false;
    
    const nodeName = this.getNodeName(node);
    if (!nodeName) return false;
    
    // Look for export statements that reference this node
    let isExported = false;
    
    const visit = (n: ts.Node) => {
      // Check for named exports: export { ComponentName }
      if (ts.isExportDeclaration(n) && n.exportClause && ts.isNamedExports(n.exportClause)) {
        n.exportClause.elements.forEach(element => {
          if (ts.isExportSpecifier(element)) {
            const exportName = element.name.text;
            const propertyName = element.propertyName?.text || exportName;
            if (exportName === nodeName || propertyName === nodeName) {
              isExported = true;
            }
          }
        });
      }
      
      // Check for export default statements
      if (ts.isExportAssignment(n)) {
        if (n.expression === node) {
          isExported = true;
        }
      }
      
      // Check for export default in variable/function/class declarations
      if (ts.isVariableStatement(n) && n.modifiers) {
        const hasExport = n.modifiers.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
        if (hasExport) {
          // Check if this variable statement contains our node
          n.declarationList.declarations.forEach(decl => {
            if (decl === node || (ts.isIdentifier(decl.name) && decl.name.text === nodeName)) {
              isExported = true;
            }
          });
        }
      }
      
      // Check for export default function/class
      if ((ts.isFunctionDeclaration(n) || ts.isClassDeclaration(n)) && n.name && ts.isIdentifier(n.name) && n.name.text === nodeName) {
        // Check if parent has export default
        if (n.parent && ts.isSourceFile(n.parent)) {
          // Look for export default in the same file
          const fileText = n.parent.getText();
          const exportPattern = new RegExp(`export\\s+default\\s+${nodeName}\\b`);
          if (exportPattern.test(fileText)) {
            isExported = true;
          }
        }
      }
      
      // Check for re-exports: export { ComponentName } from './path'
      if (ts.isExportDeclaration(n) && n.exportClause && ts.isNamedExports(n.exportClause)) {
        n.exportClause.elements.forEach(element => {
          if (ts.isExportSpecifier(element)) {
            const exportName = element.name.text;
            if (exportName === nodeName) {
              isExported = true;
            }
          }
        });
      }
      
      ts.forEachChild(n, visit);
    };
    
    visit(sourceFile);
    return isExported;
  }

  /**
   * Generate semantic analysis for a pattern
   */
  private analyzeSemantics(node: ts.Node): any {
    const purpose = this.determinePurpose(node);
    const complexity = this.calculateComplexity(node);
    const dependencies = this.extractDependencies(node);
    const architecturalMetrics = this.calculateArchitecturalMetrics(node);

    return {
      purpose,
      complexity,
      dependencies,
      architecturalMetrics
    };
  }

  /**
   * Determine the purpose of a pattern (UI, Logic, Data, Utility)
   */
  private determinePurpose(node: ts.Node): string {
    // Check for UI patterns (JSX, React components)
    if (this.hasJSXReturn(node)) return 'UI';
    
    // Check for data patterns (interfaces, types, data structures)
    if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
      return this.analyzeDataPatternPurpose(node);
    }
    
    // Check for logic patterns (functions with complex logic)
    if (ts.isFunctionLike(node)) {
      if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node) || ts.isMethodDeclaration(node)) {
        return this.analyzeLogicPatternPurpose(node);
      }
    }
    
    return 'Utility';
  }

  /**
   * Analyze data pattern purpose
   */
  private analyzeDataPatternPurpose(node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration): string {
    const name = node.name.text.toLowerCase();
    
    // Check for common data pattern names
    if (name.includes('props') || name.includes('state') || name.includes('config')) return 'Data';
    if (name.includes('api') || name.includes('response') || name.includes('request')) return 'Data';
    if (name.includes('model') || name.includes('entity') || name.includes('dto')) return 'Data';
    
    // Check for UI-related data
    if (name.includes('component') || name.includes('ui') || name.includes('view')) return 'UI';
    
    return 'Data';
  }

  /**
   * Analyze logic pattern purpose
   */
  private analyzeLogicPatternPurpose(node: ts.FunctionLikeDeclaration): string {
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
   * Calculate architectural metrics for a pattern
   */
  private calculateArchitecturalMetrics(node: ts.Node): any {
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
   * Extract dependencies from a node
   */
  private extractDependencies(node: ts.Node): string[] {
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
   * Generate hash for pattern identification
   */
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

  /**
   * Validate pattern detection accuracy and quality
   */
  private validatePatternQuality(patterns: CodePattern[]): any {
    const qualityMetrics = {
      patternDetectionRate: 0,
      typeResolutionAccuracy: 0,
      semanticAnalysisQuality: 0,
      crossFileConsistency: 0,
      overallQuality: 0
    };

    if (patterns.length === 0) return qualityMetrics;

    // Calculate pattern detection rate
    const validPatterns = patterns.filter(p => p.name && p.type && p.filePath);
    qualityMetrics.patternDetectionRate = (validPatterns.length / patterns.length) * 100;

    // Calculate type resolution accuracy
    const patternsWithTypes = patterns.filter(p => 
      p.metadata.returnType || 
      p.metadata.parameters?.length > 0 || 
      (p.metadata.genericTypes && p.metadata.genericTypes.length > 0)
    );
    qualityMetrics.typeResolutionAccuracy = (patternsWithTypes.length / patterns.length) * 100;

    // Calculate semantic analysis quality
    const patternsWithSemantics = patterns.filter(p => 
      p.metadata.purpose && 
      p.metadata.architecturalMetrics && 
      p.metadata.complexity > 0
    );
    qualityMetrics.semanticAnalysisQuality = (patternsWithSemantics.length / patterns.length) * 100;

    // Calculate cross-file consistency
    const fileGroups = this.groupPatternsByFile(patterns);
    const consistencyScores = Object.values(fileGroups).map(group => 
      this.calculateFileConsistency(group as CodePattern[])
    );
    qualityMetrics.crossFileConsistency = consistencyScores.reduce((a, b) => a + b, 0) / consistencyScores.length;

    // Calculate overall quality
    qualityMetrics.overallQuality = (
      qualityMetrics.patternDetectionRate * 0.3 +
      qualityMetrics.typeResolutionAccuracy * 0.3 +
      qualityMetrics.semanticAnalysisQuality * 0.25 +
      qualityMetrics.crossFileConsistency * 0.15
    );

    return qualityMetrics;
  }

  /**
   * Group patterns by file for consistency analysis
   */
  private groupPatternsByFile(patterns: CodePattern[]): Record<string, CodePattern[]> {
    const groups: Record<string, CodePattern[]> = {};
    
    patterns.forEach(pattern => {
      const file = pattern.filePath;
      if (!groups[file]) {
        groups[file] = [];
      }
      groups[file].push(pattern);
    });
    
    return groups;
  }

  /**
   * Calculate consistency within a single file
   */
  private calculateFileConsistency(patterns: CodePattern[]): number {
    if (patterns.length <= 1) return 100;
    
    // Check for consistent naming conventions
    const namingConsistency = this.checkNamingConsistency(patterns);
    
    // Check for consistent type usage
    const typeConsistency = this.checkTypeConsistency(patterns);
    
    // Check for consistent structure
    const structureConsistency = this.checkStructureConsistency(patterns);
    
    return (namingConsistency + typeConsistency + structureConsistency) / 3;
  }

  /**
   * Check naming consistency within a file
   */
  private checkNamingConsistency(patterns: CodePattern[]): number {
    const namingStyles = patterns.map(p => this.analyzeNamingStyle(p.name));
    const styleCounts = namingStyles.reduce((acc, style) => {
      acc[style] = (acc[style] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const dominantStyle = Math.max(...Object.values(styleCounts));
    return (dominantStyle / patterns.length) * 100;
  }

  /**
   * Analyze naming style of a pattern
   */
  private analyzeNamingStyle(name: string): string {
    if (name.match(/^[A-Z][a-zA-Z]*$/)) return 'PascalCase';
    if (name.match(/^[a-z][a-zA-Z]*$/)) return 'camelCase';
    if (name.match(/^[a-z_][a-z0-9_]*$/)) return 'snake_case';
    if (name.match(/^[A-Z_][A-Z0-9_]*$/)) return 'UPPER_SNAKE_CASE';
    return 'mixed';
  }

  /**
   * Check type consistency within a file
   */
  private checkTypeConsistency(patterns: CodePattern[]): number {
    const patternsWithTypes = patterns.filter(p => p.metadata.returnType || p.metadata.parameters?.length > 0);
    if (patternsWithTypes.length === 0) return 100;
    
    const typeUsage = patternsWithTypes.map(p => ({
      returnType: p.metadata.returnType || 'any',
      hasParameters: p.metadata.parameters?.length > 0,
      hasGenerics: p.metadata.genericTypes && p.metadata.genericTypes.length > 0
    }));
    
    // Check if similar patterns have similar type structures
    let consistencyScore = 0;
    for (let i = 0; i < typeUsage.length; i++) {
      for (let j = i + 1; j < typeUsage.length; j++) {
        if (typeUsage[i]?.hasParameters === typeUsage[j]?.hasParameters &&
            typeUsage[i]?.hasGenerics === typeUsage[j]?.hasGenerics) {
          consistencyScore += 1;
        }
      }
    }
    
    const maxComparisons = (typeUsage.length * (typeUsage.length - 1)) / 2;
    return maxComparisons > 0 ? (consistencyScore / maxComparisons) * 100 : 100;
  }

  /**
   * Check structure consistency within a file
   */
  private checkStructureConsistency(patterns: CodePattern[]): number {
    const patternsWithStructure = patterns.filter(p => p.metadata.complexity > 0);
    if (patternsWithStructure.length === 0) return 100;
    
    const complexities = patternsWithStructure.map(p => p.metadata.complexity);
    const avgComplexity = complexities.reduce((a, b) => a + b, 0) / complexities.length;
    
    // Check if complexity is consistent (within reasonable range)
    const variance = complexities.reduce((acc, comp) => acc + Math.pow(comp - avgComplexity, 2), 0) / complexities.length;
    const standardDeviation = Math.sqrt(variance);
    
    // Lower standard deviation means more consistent structure
    const consistencyScore = Math.max(0, 100 - (standardDeviation * 10));
    return consistencyScore;
  }

  /**
   * Generate comprehensive quality report
   */
  private generateQualityReport(patterns: CodePattern[], errors: ParseError[]): any {
    const qualityMetrics = this.validatePatternQuality(patterns);
    const performanceMetrics = this.calculatePerformanceMetrics();
    
    return {
      quality: qualityMetrics,
      performance: performanceMetrics,
      recommendations: this.generateQualityRecommendations(qualityMetrics, patterns),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Calculate performance metrics
   */
  private calculatePerformanceMetrics(): any {
    return {
      processingTime: Date.now() - this.startTime,
      memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024, // MB
      patternsPerSecond: this.totalPatterns / ((Date.now() - this.startTime) / 1000),
      efficiency: this.totalPatterns / (process.memoryUsage().heapUsed / 1024 / 1024) // patterns per MB
    };
  }

  /**
   * Generate quality improvement recommendations
   */
  private generateQualityRecommendations(qualityMetrics: any, patterns: CodePattern[]): string[] {
    const recommendations: string[] = [];
    
    if (qualityMetrics.patternDetectionRate < 90) {
      recommendations.push('Improve pattern detection by enhancing type resolution and semantic analysis');
    }
    
    if (qualityMetrics.typeResolutionAccuracy < 85) {
      recommendations.push('Enhance TypeScript type extraction for better accuracy');
    }
    
    if (qualityMetrics.semanticAnalysisQuality < 80) {
      recommendations.push('Strengthen semantic analysis for better pattern classification');
    }
    
    if (qualityMetrics.crossFileConsistency < 75) {
      recommendations.push('Improve cross-file consistency by standardizing analysis approach');
    }
    
    // Pattern-specific recommendations
    const uiPatterns = patterns.filter(p => p.metadata.purpose === 'UI');
    const logicPatterns = patterns.filter(p => p.metadata.purpose === 'Logic');
    
    if (uiPatterns.length > 0 && logicPatterns.length > 0) {
      const avgUIComplexity = uiPatterns.reduce((acc, p) => acc + p.metadata.complexity, 0) / uiPatterns.length;
      const avgLogicComplexity = logicPatterns.reduce((acc, p) => acc + p.metadata.complexity, 0) / logicPatterns.length;
      
      if (avgUIComplexity > avgLogicComplexity) {
        recommendations.push('Consider simplifying UI components by extracting complex logic into custom hooks');
      }
    }
    
    return recommendations;
  }

  /**
   * Filter patterns by quality thresholds
   */
  public filterPatternsByQuality(patterns: CodePattern[], options: ParseOptions = {}): CodePattern[] {
    if (!options.qualityFilters) {
      return patterns; // No filtering if no quality filters specified
    }

    const filters = options.qualityFilters;
    const qualityReport = this.validatePatternQuality(patterns);
    
    return patterns.filter(pattern => {
      // Check if pattern meets quality thresholds
      const patternQuality = this.calculateIndividualPatternQuality(pattern);
      
      // Apply quality filters
      if (filters.minOverallQuality && patternQuality.overallQuality < filters.minOverallQuality) {
        return false;
      }
      
      if (filters.minPatternDetectionRate && qualityReport.patternDetectionRate < filters.minPatternDetectionRate) {
        return false;
      }
      
      if (filters.minTypeResolutionAccuracy && patternQuality.typeResolutionAccuracy < filters.minTypeResolutionAccuracy) {
        return false;
      }
      
      if (filters.minSemanticAnalysisQuality && patternQuality.semanticAnalysisQuality < filters.minSemanticAnalysisQuality) {
        return false;
      }
      
      if (filters.minCrossFileConsistency && qualityReport.crossFileConsistency < filters.minCrossFileConsistency) {
        return false;
      }
      
      return true;
    });
  }

  /**
   * Calculate quality metrics for an individual pattern
   */
  private calculateIndividualPatternQuality(pattern: CodePattern): any {
    const quality = {
      typeResolutionAccuracy: 0,
      semanticAnalysisQuality: 0,
      overallQuality: 0
    };
    
    // Calculate type resolution accuracy
    if (pattern.metadata.returnType && pattern.metadata.returnType !== 'any') {
      quality.typeResolutionAccuracy += 50;
    }
    if (pattern.metadata.parameters && pattern.metadata.parameters.length > 0) {
      quality.typeResolutionAccuracy += 30;
    }
    if (pattern.metadata.genericTypes && pattern.metadata.genericTypes.length > 0) {
      quality.typeResolutionAccuracy += 20;
    }
    
    // Calculate semantic analysis quality
    if (pattern.metadata.purpose) {
      quality.semanticAnalysisQuality += 40;
    }
    if (pattern.metadata.architecturalMetrics) {
      quality.semanticAnalysisQuality += 30;
    }
    if (pattern.metadata.complexity > 0) {
      quality.semanticAnalysisQuality += 30;
    }
    
    // Calculate overall quality
    quality.overallQuality = (quality.typeResolutionAccuracy + quality.semanticAnalysisQuality) / 2;
    
    return quality;
  }

  /**
   * Get quality summary for patterns
   */
  public getQualitySummary(patterns: CodePattern[]): any {
    const qualityReport = this.validatePatternQuality(patterns);
    const individualQualities = patterns.map(p => this.calculateIndividualPatternQuality(p));
    
    const summary = {
      overall: qualityReport,
      distribution: {
        high: individualQualities.filter(q => q.overallQuality >= 80).length,
        medium: individualQualities.filter(q => q.overallQuality >= 60 && q.overallQuality < 80).length,
        low: individualQualities.filter(q => q.overallQuality < 60).length
      },
      recommendations: this.generateQualityRecommendations(qualityReport, patterns)
    };
    
    return summary;
  }

  /**
   * Check if a node is a default export - enhanced detection
   */
  private isDefaultExport(node: ts.Node): boolean {
    // Check for direct export default assignment
    if (node.parent && ts.isExportAssignment(node.parent) && node.parent.expression === node) {
      return true;
    }
    
    // Check for export default in variable declarations
    if (ts.isVariableDeclaration(node) && node.parent && ts.isVariableDeclarationList(node.parent)) {
      const varList = node.parent;
      if (varList.parent && ts.isVariableStatement(varList.parent)) {
        const varStatement = varList.parent;
        // Check if this is an export default statement
        if (varStatement.modifiers && varStatement.modifiers.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
          // Look for 'default' keyword in the same statement
          const sourceFile = node.getSourceFile();
          if (sourceFile) {
            const nodeStart = node.getStart();
            const nodeEnd = node.getEnd();
            const surroundingText = sourceFile.text.substring(Math.max(0, nodeStart - 50), nodeEnd + 50);
            if (surroundingText.includes('export default')) {
              return true;
            }
          }
        }
      }
    }
    
    // Check for export default function/class declarations
    if ((ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) && node.name) {
      const sourceFile = node.getSourceFile();
      if (sourceFile) {
        const nodeStart = node.getStart();
        const nodeEnd = node.getEnd();
        const surroundingText = sourceFile.text.substring(Math.max(0, nodeStart - 50), nodeEnd + 50);
        if (surroundingText.includes('export default')) {
          return true;
        }
      }
    }
    
    return false;
  }

  /**
   * Extract prop types from React components
   */
  private extractPropTypes(node: ts.Node): any {
    const propTypes: any = {};
    
    try {
      // Look for prop type definitions in the same file
      const sourceFile = node.getSourceFile();
      if (!sourceFile) return propTypes;
      
      // Check if this is a React component (has JSX return or specific naming)
      if (this.hasJSXReturn(node) || this.isReactComponent(node)) {
        // Look for Props interface or type
        const componentName = this.getNodeName(node);
        if (componentName) {
          // Search for Props interface/type in the same file
          const propsPattern = new RegExp(`(interface|type)\\s+${componentName}Props\\s*[=:]`);
          if (propsPattern.test(sourceFile.text)) {
            propTypes.hasPropsInterface = true;
            propTypes.propsInterfaceName = `${componentName}Props`;
          }
        }
        
        // Check for inline prop types
        if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
          if (node.parameters && node.parameters.length > 0) {
            const firstParam = node.parameters[0];
            if (firstParam && firstParam.type) {
              propTypes.inlineProps = true;
              propTypes.propsType = this.typeToString(this.typeChecker!.getTypeFromTypeNode(firstParam.type));
            }
          }
        }
      }
    } catch (error) {
      // Fallback to empty props
    }
    
    return propTypes;
  }

  /**
   * Check if a node is a React component
   */
  private isReactComponent(node: ts.Node): boolean {
    const name = this.getNodeName(node);
    if (!name) return false;
    
    // React components typically start with capital letters
    if (name.match(/^[A-Z][a-zA-Z]*$/)) {
      return true;
    }
    
    // Check for JSX return
    if (this.hasJSXReturn(node)) {
      return true;
    }
    
    return false;
  }

  /**
   * Calculate usage count of a function/component
   */
  private calculateUsageCount(node: ts.Node, sourceFile: ts.SourceFile): number {
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

  /**
   * Get last modified timestamp
   */
  private getLastModified(node: ts.Node, sourceFile: ts.SourceFile): Date {
    // For now, return current time - can be enhanced with git history
    return new Date();
  }

  /**
   * Get detailed export information for a node
   */
  private getExportDetails(node: ts.Node): any {
    const exportInfo: {
      isExported: boolean;
      exportType: string;
      exportName: string | null;
      exportPath: string | null;
      isReExported: boolean;
    } = {
      isExported: false,
      exportType: 'none', // 'named', 'default', 're-export', 'none'
      exportName: null,
      exportPath: null,
      isReExported: false
    };
    
    if (!this.isExported(node)) {
      return exportInfo;
    }
    
    exportInfo.isExported = true;
    const nodeName = this.getNodeName(node);
    if (!nodeName) return exportInfo;
    
    // Check for default export
    if (this.isDefaultExport(node)) {
      exportInfo.exportType = 'default';
      exportInfo.exportName = nodeName;
      return exportInfo;
    }
    
    // Check for named export
    const sourceFile = node.getSourceFile();
    if (sourceFile) {
      const visit = (n: ts.Node) => {
        if (ts.isExportDeclaration(n)) {
          if (n.exportClause && ts.isNamedExports(n.exportClause)) {
            n.exportClause.elements.forEach(element => {
              if (ts.isExportSpecifier(element)) {
                const exportName = element.name.text;
                const propertyName = element.propertyName?.text || exportName;
                if (exportName === nodeName || propertyName === nodeName) {
                  exportInfo.exportType = 'named';
                  exportInfo.exportName = exportName;
                  
                  // Check if this is a re-export
                  if (n.moduleSpecifier && ts.isStringLiteral(n.moduleSpecifier)) {
                    exportInfo.isReExported = true;
                    exportInfo.exportPath = n.moduleSpecifier.text;
                    exportInfo.exportType = 're-export';
                  }
                }
              }
            });
          }
        }
        ts.forEachChild(n, visit);
      };
      visit(sourceFile);
    }
    
    return exportInfo;
  }
}
