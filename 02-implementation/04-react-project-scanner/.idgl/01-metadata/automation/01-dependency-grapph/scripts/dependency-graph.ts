import * as fs from 'fs';
import * as path from 'path';
import { Project, Submodule, DependencyGraph } from './types';

// Constants
const WORKSPACE_ROOT = path.resolve(__dirname, '../../../../..');
const OUTPUT_PATH = path.join(__dirname, '../../../output/dependency-graph.json');
const SKIP_DIRECTORIES = ['.idgl', '.git', 'node_modules'];

// Git modules parsing constants
const GITMODULES = {
  SUBMODULE_PREFIX: '[submodule',
  PATH_PREFIX: 'path = ',
  URL_PREFIX: 'url = ',
  PATH_PREFIX_LENGTH: 7,
  URL_PREFIX_LENGTH: 6
} as const;

// File utilities
function readJsonFile(filePath: string): any {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function isDirectory(dirPath: string): boolean {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

// Git modules parsing
function parseGitmodulesContent(content: string): Submodule[] {
  const submodules: Submodule[] = [];
  const lines = content.split('\n');
  let currentSubmodule: Partial<Submodule> = {};
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith(GITMODULES.SUBMODULE_PREFIX)) {
      saveSubmoduleIfValid(currentSubmodule, submodules);
      currentSubmodule = {};
    } else if (trimmedLine.startsWith(GITMODULES.PATH_PREFIX)) {
      currentSubmodule.path = extractValue(trimmedLine, GITMODULES.PATH_PREFIX_LENGTH);
    } else if (trimmedLine.startsWith(GITMODULES.URL_PREFIX)) {
      const url = extractValue(trimmedLine, GITMODULES.URL_PREFIX_LENGTH);
      currentSubmodule.target = extractTargetFromUrl(url);
    }
  }
  
  saveSubmoduleIfValid(currentSubmodule, submodules);
  return submodules;
}

function extractValue(line: string, prefixLength: number): string {
  return line.substring(prefixLength);
}

function extractTargetFromUrl(url: string): string {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1].replace('.git', '');
}

function saveSubmoduleIfValid(submodule: Partial<Submodule>, submodules: Submodule[]): void {
  if (submodule.target && submodule.path) {
    submodules.push(submodule as Submodule);
  }
}

function readGitmodulesFile(filePath: string): Submodule[] {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return parseGitmodulesContent(content);
  } catch {
    return [];
  }
}

// Project scanning
function isValidProject(packageJson: any): boolean {
  return packageJson && packageJson.name && packageJson.version;
}

function scanProjects(): Project[] {
  const projects: Project[] = [];
  
  try {
    const entries = fs.readdirSync(WORKSPACE_ROOT);
    
    for (const entry of entries) {
      const fullPath = path.join(WORKSPACE_ROOT, entry);
      
      if (!isDirectory(fullPath) || SKIP_DIRECTORIES.includes(entry)) {
        continue;
      }
      
      const packageJsonPath = path.join(fullPath, 'package.json');
      const packageJson = readJsonFile(packageJsonPath);
      
      if (!isValidProject(packageJson)) {
        continue;
      }
      
      const gitmodulesPath = path.join(fullPath, '.gitmodules');
      const submodules = readGitmodulesFile(gitmodulesPath);
      
      projects.push({
        id: packageJson.name,
        path: entry + '/',
        version: packageJson.version,
        submodules
      });
    }
  } catch (error) {
    console.error('Error scanning workspace:', error);
  }
  
  return projects;
}

// Main function
function generateDependencyGraph(): void {
  console.log('Scanning workspace for projects...');
  
  const projects = scanProjects();
  const dependencyGraph: DependencyGraph = { projects };
  
  try {
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(dependencyGraph, null, 2));
    console.log(`Dependency graph generated: ${OUTPUT_PATH}`);
    console.log(`Found ${projects.length} projects`);
  } catch (error) {
    console.error('Error writing output file:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateDependencyGraph();
}

export { generateDependencyGraph, scanProjects };

