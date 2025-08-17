# Dependency Graph Generator

A TypeScript tool that scans the workspace root for projects, reads `package.json` and `.gitmodules` files, and outputs JSON with project metadata and submodule relationships.

## Features

- Scans workspace root for projects at the same level as `.idgl/`
- Reads `package.json` files to extract project name and version
- Parses `.gitmodules` files to identify submodule relationships
- Outputs structured JSON with project metadata
- Handles missing files gracefully
- Skips system directories (`.idgl`, `.git`, `node_modules`)

## Installation

```bash
npm install
```

## Usage

### Development (with ts-node)
```bash
npm run dev
```

### Production (compiled)
```bash
npm run build
npm start
```

## Output

The tool generates a `dependency-graph.json` file in the same directory with the following structure:

```json
{
  "projects": [
    {
      "id": "react-checkout",
      "path": "react-checkout/",
      "version": "1.0.0",
      "submodules": [
        {
          "target": "shared-ui",
          "path": "pmc-react-shared/"
        }
      ]
    }
  ]
}
```

## Implementation Details

- **Language**: TypeScript with Node.js built-ins only
- **Input**: Workspace root directory structure
- **Output**: JSON file at `.idgl/01-metadata/dependency-graph.json`
- **Error Handling**: Graceful handling of missing files and directories
- **Performance**: Efficient scanning with minimal file system operations

## File Structure

```
.idgl/01-metadata/automation/
├── dependency-graph-generator.ts    # Main implementation
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── README.md                        # This documentation
└── dependency-graph.json           # Generated output (after running)
```

## Dependencies

- Node.js >= 16.0.0
- TypeScript >= 5.0.0
- @types/node >= 20.0.0
- ts-node >= 10.9.0 (dev dependency)
