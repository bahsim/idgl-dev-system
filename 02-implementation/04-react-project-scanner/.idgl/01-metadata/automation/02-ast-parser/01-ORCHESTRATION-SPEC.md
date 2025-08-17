# **IDGL Spec: Project AST Analysis Orchestrator**

## **Objective**
Create a simple script that executes the existing AST parser across all main projects defined in the dependency graph, completely ignoring submodules to avoid duplicate parsing and provide clean, organized output.

## **Rationale**

**Business Rationale:**
- **Comprehensive Analysis**: Need to analyze patterns across all main projects in the dependency ecosystem
- **Eliminate Duplicates**: Avoid parsing the same code multiple times through submodule references
- **Batch Processing**: Single command to analyze entire project ecosystem instead of running parser individually
- **Manageable Output**: Split results into separate files instead of one massive JSON file

**Technical Constraints:**
- **Single Responsibility**: Script does one thing - orchestrates AST parser execution
- **No New Features**: Uses existing AST parser without modifications
- **Submodule Ignorance**: Completely ignores submodules to prevent duplicate processing
- **Organized Output**: Creates directory structure with separate files per project

## **Verification Criteria**

### **1. Project Discovery**
- [x] **Dependency Graph Parsing**: Reads and parses `dependency-graph.json` file
- [x] **Project Enumeration**: Identifies all main projects (ignores submodules completely)
- [x] **Path Resolution**: Resolves relative paths to absolute paths for each project
- [x] **Submodule Filtering**: Completely skips submodule processing to avoid duplicates

### **2. AST Parser Execution**
- [x] **Sequential Processing**: Executes AST parser on each main project directory
- [x] **Error Handling**: Continues processing if individual projects fail
- [x] **Progress Reporting**: Shows which project is currently being processed
- [x] **Verbose Logging**: Shows detailed pattern extraction per project (functions, interfaces, types)

### **3. Output Organization**
- [x] **Directory Creation**: Creates `ast-parser-output/` directory structure
- [x] **Separate Files**: Saves each project to individual `<project-name>.json` files
- [x] **Summary File**: Creates `_summary.json` with overall statistics
- [x] **Clean Structure**: Avoids massive single JSON files (prevents 11M+ line files)

## **Implementation Requirements**

### **Core Functionality**
```typescript
interface ProjectAnalysis {
  projectName: string;
  projectPath: string;
  patterns: CodePattern[];
  errors: string[];
  stats: ParseStats;
}

interface AnalysisResult {
  projects: ProjectAnalysis[];
  totalPatterns: number;
  processingTime: number;
}

interface DependencyGraph {
  projects: {
    [key: string]: {
      path: string;
      submodules?: Submodule[]; // Ignored in processing
    };
  };
}
```

### **Script Behavior**
1. **Read** `dependency-graph.json` from `01-metadata/output/` directory
2. **For each main project**:
   - Run AST parser on main project directory only
   - Completely ignore submodules (prevents duplicate parsing)
   - Extract patterns (functions, interfaces, types) with verbose logging
3. **Organize output**:
   - Create `ast-parser-output/` directory structure
   - Save each project to separate `<project-name>.json` files
   - Create `_summary.json` with overall statistics
4. **Skip non-existent directories** gracefully

### **CLI Interface**
```bash
# Analyze all projects in dependency graph
npm run analyze-all

# Output to specific directory
npm run analyze-all -- --output custom-output-dir

# Show help
npm run analyze-all -- --help
```

**Output Structure:**
```
ast-parser-output/
├── _summary.json          # Overall statistics
├── react-shared.json      # Individual project results
├── react-browse.json      # Individual project results
└── ...                    # One file per project
```

## **Success Metrics**
- **Completeness**: Analyzes all main projects in dependency graph (ignores submodules)
- **Elimination of Duplicates**: No duplicate parsing of the same code through submodules
- **Performance**: Processes entire ecosystem in reasonable time (~80 seconds for 32 projects)
- **Reliability**: Handles errors gracefully without stopping entire process
- **Output Manageability**: Creates manageable file sizes instead of massive single JSON files

## **Constraints**
- **No New Parser Features**: Uses existing AST parser as-is
- **No Complex Orchestration**: Simple sequential processing only
- **No Submodule Processing**: Completely ignores submodules to prevent duplicates
- **No Real-time Monitoring**: Basic progress reporting only
- **No Dependency Resolution**: Assumes projects are accessible at specified paths
- **Output Directory Structure**: Creates organized directory with separate files per project
