# Dependency Graph Generator

## What it does
Scan workspace root for projects, read `package.json` and `.gitmodules` files, output JSON with project metadata and submodule relationships.

## Input
- Workspace root directory with projects at same level as `.idgl/`
- Each project has `package.json` (name, version) and `.gitmodules` (submodule paths)

## Output
**JSON file** with projects array, each containing:
   - `id`: project name from package.json
   - `path`: relative path to project
   - `version`: version from package.json  
   - `submodules`: array of {target, path} objects

## Implementation
- TypeScript with Node.js built-ins only
- Constants at top for paths and configuration
- Skip `.idgl`, `.git`, `node_modules`
- Handle missing files gracefully
- Output to `.idgl/01-metadata/dependency-graph.json`

## Code Quality Requirements
- **No magic numbers**: All hardcoded values must be named constants
- **Function separation**: Single responsibility for each function
- **Consistent error handling**: Graceful failures with appropriate defaults
- **Self-documenting code**: Clear function and variable names
- **Maintainable structure**: Easy to understand and modify

## Error Handling Standards
- Missing files return empty arrays or null (no crashes)
- Invalid JSON files are skipped gracefully
- Directory access errors are handled silently
- Clear error messages for critical failures

## Example JSON output
```json
{
  "projects": [
    {
      "id": "react-checkout",
      "path": "react-checkout/",
      "version": "1.0.0", 
      "submodules": [
        {"target": "shared-ui", "path": "pmc-react-shared/"}
      ]
    }
  ]
}
```

## Generated Files
- `dependency-graph.json` - Raw project data

## Success Criteria
- [ ] Scans workspace and finds all projects with package.json
- [ ] Extracts project metadata (name, version, path)
- [ ] Parses .gitmodules files for submodule relationships
- [ ] Outputs valid JSON with consistent structure
- [ ] Handles missing files gracefully (no crashes)
- [ ] Skips system directories (.idgl, .git, node_modules)
- [ ] No magic numbers in code (all values named)
- [ ] Functions have single responsibilities
- [ ] Error handling is consistent across all operations
- [ ] Code is self-documenting and maintainable
