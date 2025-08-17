export interface Submodule {
  target: string;
  path: string;
}

export interface Project {
  id: string;
  path: string;
  version: string;
  submodules: Submodule[];
}

export interface DependencyGraph {
  projects: Project[];
}
