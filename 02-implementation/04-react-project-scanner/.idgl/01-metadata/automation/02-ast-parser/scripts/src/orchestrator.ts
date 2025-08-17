/**
 * Simple Project AST Analyzer - Using Simplified Architecture
 * Finds all project directories (excluding .idgl) and runs the new simplified AST parser on each
 * Architecture: Composable components with pipeline orchestration
 */
import * as fs from 'fs';
import * as path from 'path';
import { SimplifiedParser } from './core/simplified-parser';
import { ParseOptions, CodePattern } from './core/types';


// Path constants
const PATHS = {
    IDGL_FOLDER_NAME: '.idgl',
    METADATA_DIR: '01-metadata',
    OUTPUT_DIR: 'output',
    AST_PARSER_OUTPUT_DIR: 'ast-parser-output',
    DEPENDENCY_GRAPH: 'dependency-graph.json'
} as const;

// Dynamic path functions
function getProjectsRoot(): string {
    return path.resolve(findWorkspaceRoot(), '..');
}

function getMetadataPath(): string {
    return path.join(findWorkspaceRoot(), PATHS.METADATA_DIR);
}

function getOutputDir(): string {
    return path.join(getMetadataPath(), PATHS.OUTPUT_DIR, PATHS.AST_PARSER_OUTPUT_DIR);
}

function getDependencyGraphPath(): string {
    return path.join(getMetadataPath(),PATHS.OUTPUT_DIR, PATHS.DEPENDENCY_GRAPH);
}


// Help text template
const HELP_TEXT = `
Simple Project AST Analyzer - Simplified Architecture

Usage: npm run analyze-all [--output directory]

Options:
  --output, -o <dir>     Output directory (default: ast-parser-output/)
  --help, -h             Show this help

Architecture:
  • Pattern Extractor: Extracts patterns from AST nodes
  • Type Resolver: Resolves TypeScript type information
  • Semantic Analyzer: Analyzes purpose and complexity
  • Export Tracker: Tracks export/import relationships
  • Quality Calculator: Calculates quality metrics
  • Parsing Pipeline: Orchestrates all components
`;

// Default values
const DEFAULTS = {
    STATS: {
        totalFiles: 0,
        processedFiles: 0,
        totalPatterns: 0,
        processingTime: 0,
        memoryUsage: 0
    }
} as const;

interface DependencyGraph {
    projects: {
        [key: string]: {
            path: string;
        };
    };
}

interface ProjectAnalysis {
    projectName: string;
    projectPath: string;
    patterns: CodePattern[];
    errors: string[];
    stats: any;
    qualityReport?: any;
}

interface AnalysisResult {
    projects: ProjectAnalysis[];
    totalPatterns: number;
    processingTime: number;
    totalQuality?: number;
}

/**
 * Find workspace root by looking for .idgl folder
 */
function findWorkspaceRoot(): string {
    let currentDir = process.cwd();

    while (currentDir !== path.dirname(currentDir)) {
        if (fs.existsSync(path.join(currentDir, PATHS.IDGL_FOLDER_NAME))) {
            return path.join(currentDir, PATHS.IDGL_FOLDER_NAME);
        }
        currentDir = path.dirname(currentDir);
    }

    throw new Error(`No ${PATHS.IDGL_FOLDER_NAME} folder found. Run from within the workspace.`);
}

/**
 * Load dependency graph from file
 */
function loadDependencyGraph(): DependencyGraph {
    try {
        const graphPath = getDependencyGraphPath();
        if (!fs.existsSync(graphPath)) {
            throw new Error(`Dependency graph not found at: ${graphPath}`);
        }

        const content = fs.readFileSync(graphPath, 'utf-8');
        return JSON.parse(content) as DependencyGraph;
    } catch (error) {
        throw new Error(`Failed to load dependency graph: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Get project directories from dependency graph
 */
function getProjectDirectoriesFromGraph(): string[] {
    const graph = loadDependencyGraph();
    const projectPaths: string[] = [];
    
    // Only process main projects, completely ignore submodules
    for (const [projectName, projectInfo] of Object.entries(graph.projects)) {
        const projectPath = path.resolve(getProjectsRoot(), projectInfo.path);
        projectPaths.push(projectPath);
    }
    
    return projectPaths;
}

/**
 * Analyze a single project directory using the new simplified architecture
 */
async function analyzeProject(projectPath: string, options: ParseOptions): Promise<ProjectAnalysis> {
    try {
        if (fs.existsSync(projectPath)) {
            const entries = fs.readdirSync(projectPath, { withFileTypes: true });
            const tsFiles = entries.filter(entry => 
                entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))
            );
        }
        
        // Use the NEW simplified parser with composable architecture
        const parser = new SimplifiedParser({ ...options, verbose: true });
        const result = await parser.parseProject(projectPath);

        return {
            projectName: path.basename(projectPath),
            projectPath: projectPath,
            patterns: result.patterns,
            errors: result.errors.map((e: any) => e.message),
            stats: result.stats,
            qualityReport: result.qualityReport
        };
    } catch (error) {
        console.log(`❌ Debug: Error analyzing ${path.basename(projectPath)}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return {
            projectName: path.basename(projectPath),
            projectPath: projectPath,
            patterns: [],
            errors: [error instanceof Error ? error.message : 'Unknown error'],
            stats: DEFAULTS.STATS
        };
    }
}

/**
 * Main analysis function using simplified architecture
 */
async function analyzeAllProjects(options: ParseOptions = {}): Promise<AnalysisResult> {
    const startTime = Date.now();

    // Find workspace and get project directories from dependency graph
    const projectDirs = getProjectDirectoriesFromGraph();

    console.log(`🔍 Found ${projectDirs.length} projects/submodules from dependency graph`);
    console.log(`🏗️  Using Simplified AST Parser Architecture (Composable Components)`);

    // Analyze each project
    const projects: ProjectAnalysis[] = [];
    for (const projectDir of projectDirs) {
        const projectName = path.basename(projectDir);
        
        // Skip projects that don't exist on disk
        if (!fs.existsSync(projectDir)) {
            console.log(`\n📁 Skipping: ${projectDir} (directory does not exist)`);
            continue;
        }
        
        console.log(`\n📁 Analyzing: ${projectName}`);

        const analysis = await analyzeProject(projectDir, options);
        projects.push(analysis);

        console.log(`   ✅ Found ${analysis.patterns.length} patterns`);
        
        // Display quality metrics if available
        if (analysis.qualityReport) {
            const quality = analysis.qualityReport.quality;
            console.log(`   📈 Quality: ${quality.overallQuality.toFixed(1)}% (Detection: ${quality.patternDetectionRate.toFixed(1)}%, Types: ${quality.typeResolutionAccuracy.toFixed(1)}%)`);
        }
        
        if (analysis.errors.length > 0) {
            console.log(`   ⚠️  ${analysis.errors.length} errors`);
        }
    }

    const processingTime = Date.now() - startTime;
    const totalPatterns = projects.reduce((sum, p) => sum + p.patterns.length, 0);
    
    // Calculate overall quality across all projects
    const projectsWithQuality = projects.filter(p => p.qualityReport);
    const totalQuality = projectsWithQuality.length > 0 
        ? projectsWithQuality.reduce((sum, p) => sum + p.qualityReport!.quality.overallQuality, 0) / projectsWithQuality.length
        : 0;

    return { projects, totalPatterns, processingTime, totalQuality };
}

/**
 * CLI interface
 */
async function main(): Promise<void> {
    const args = process.argv.slice(2);
    let outputDir: string = getOutputDir();

    // Parse simple args
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--output' || args[i] === '-o') {
            outputDir = args[++i] || getOutputDir();
        } else if (args[i] === '--help' || args[i] === '-h') {
            console.log(HELP_TEXT);
            process.exit(0);
        }
    }

    console.log('🚀 Starting Project AST Analysis with Simplified Architecture...\n');
    console.log('🏗️  Architecture: Composable components with pipeline orchestration\n');

    const result = await analyzeAllProjects();

    // Filter out projects that don't exist or have no patterns
    const validProjects = result.projects.filter(project => 
        project.patterns.length > 0 || project.errors.length === 0
    );
    
    const totalValidPatterns = validProjects.reduce((sum, p) => sum + p.patterns.length, 0);
    const projectsWithPatterns = validProjects.filter(p => p.patterns.length > 0).length;
    
    // Create output directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save each project to separate file
    for (const project of validProjects) {
        if (project.patterns.length > 0) {
            const projectFileName = `${project.projectName}.json`;
            const projectFilePath = path.join(outputDir, projectFileName);
            
            const projectData = {
                metadata: {
                    projectName: project.projectName,
                    projectPath: project.projectPath,
                    generatedAt: new Date().toISOString(),
                    parserVersion: '2.0.0 - Simplified Architecture',
                    architecture: 'Composable components with pipeline orchestration',
                    patternsCount: project.patterns.length,
                    errorsCount: project.errors.length
                },
                patterns: project.patterns,
                errors: project.errors,
                stats: project.stats,
                qualityReport: project.qualityReport
            };
            
            fs.writeFileSync(projectFilePath, JSON.stringify(projectData, null, 2));
        }
    }

    // Save summary metadata
    const summaryData = {
        metadata: {
            generatedAt: new Date().toISOString(),
            workspaceRoot: findWorkspaceRoot(),
            parserVersion: '2.0.0 - Simplified Architecture',
            architecture: 'Composable components with pipeline orchestration',
            totalProjectsFound: result.projects.length,
            validProjects: validProjects.length,
            projectsWithPatterns: projectsWithPatterns,
            totalPatterns: totalValidPatterns,
            processingTime: result.processingTime,
            overallQuality: result.totalQuality ? result.totalQuality.toFixed(1) + '%' : 'N/A'
        }
    };
    
    const summaryPath = path.join(outputDir, '_summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summaryData, null, 2));
    
    // Show results
    console.log('\n📊 Analysis Complete!');
    console.log(`⏱️  Time: ${result.processingTime}ms`);
    console.log(`📁 Total Projects Found: ${result.projects.length}`);
    console.log(`✅ Valid Projects: ${validProjects.length}`);
    console.log(`🔍 Projects with Patterns: ${projectsWithPatterns}`);
    console.log(`🔍 Total Patterns: ${totalValidPatterns}`);
    
    if (result.totalQuality) {
        console.log(`📈 Overall Quality: ${result.totalQuality.toFixed(1)}%`);
    }

    console.log(`\n💾 Results saved to: ${outputDir}/`);
    console.log(`📄 Summary: _summary.json`);
    console.log(`📁 Project files: ${projectsWithPatterns} individual JSON files`);
    console.log(`\n🏗️  Architecture: Simplified AST Parser with 5 composable components`);
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

export { analyzeAllProjects, main as runAnalyzer };
