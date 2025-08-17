# AST Parser Output Quick Reference

## Complete Output Structure

### Root Level
```json
{
  "metadata": {
    "generatedAt": "2025-08-16T14:47:31.107Z",
    "workspaceRoot": "C:\\dev\\pearson\\repos\\.idgl",
    "totalProjectsFound": 32,
    "validProjects": 32,
    "projectsWithPatterns": 32,
    "totalPatterns": 91476,
    "processingTime": 325581
  },
  "patterns": [ ... ],
  "errors": [ ... ],
  "stats": { ... }
}
```

### Individual Pattern Structure
```json
{
  "id": "Button-abc123hash",
  "name": "Button",
  "type": "react-component",
  "filePath": "C:\\dev\\pearson\\repos\\react-ui\\src\\components\\Button.tsx",
  "lineNumber": 15,
  "columnNumber": 3,
  "hash": "abc123hash",
  "metadata": {
    "complexity": 3,
    "parameters": [
      {
        "name": "props",
        "type": "ButtonProps",
        "required": true
      }
    ],
    "returnType": "JSX.Element",
    "isExported": true,
    "isDefault": false,
    "exportType": "named",
    "exportName": "Button",
    "exportPath": null,
    "isReExported": false,
    "jsxReturnType": true,
    "genericTypes": [],
    "propTypes": {
      "hasPropsInterface": true,
      "propsInterfaceName": "ButtonProps",
      "inlineProps": true,
      "propsType": "ButtonProps"
    },
    "usageCount": 2,
    "lastModified": "2025-08-16T14:26:30.126Z",
    "purpose": "UI",
    "architecturalMetrics": {
      "coupling": 2.5,
      "cohesion": 8.5,
      "abstraction": 6,
      "complexity": 3,
      "maintainability": 94.5
    },
    "dependencies": ["react", "./ButtonProps"]
  },
  "dependencies": ["react", "./ButtonProps"],
  "exports": [
    {
      "type": "named",
      "name": "Button",
      "path": null,
      "isReExport": false
    }
  ]
}
```

## Field Categories

### 🔍 **Identification Fields**
- `id`, `name`, `type`, `filePath`, `lineNumber`, `columnNumber`, `hash`

### 📊 **Core Metadata**
- `complexity`, `parameters`, `returnType`, `jsxReturnType`, `genericTypes`

### 📤 **Export Information**
- `isExported`, `isDefault`, `exportType`, `exportName`, `exportPath`, `isReExported`

### 🎯 **React-Specific**
- `propTypes`, `jsxReturnType`, `purpose`

### 📈 **Quality Metrics**
- `usageCount`, `architecturalMetrics`, `dependencies`

### 🔗 **Relationships**
- `dependencies`, `exports`

## Common Pattern Types

### React Component
```json
{
  "type": "react-component",
  "metadata": {
    "jsxReturnType": true,
    "purpose": "UI",
    "propTypes": { "hasPropsInterface": true }
  }
}
```

### Custom Hook
```json
{
  "type": "custom-hook",
  "metadata": {
    "purpose": "Logic",
    "dependencies": ["useState", "useEffect"]
  }
}
```

### Utility Function
```json
{
  "type": "utility-function",
  "metadata": {
    "purpose": "Utility",
    "complexity": 1,
    "returnType": "string"
  }
}
```

### Interface/Type
```json
{
  "type": "interface",
  "metadata": {
    "purpose": "Data",
    "parameters": [],
    "returnType": "any"
  }
}
```

## Export Types

### Named Export
```json
{
  "isExported": true,
  "isDefault": false,
  "exportType": "named",
  "exportName": "ComponentName"
}
```

### Default Export
```json
{
  "isExported": true,
  "isDefault": true,
  "exportType": "default",
  "exportName": "ComponentName"
}
```

### Re-Export
```json
{
  "isExported": true,
  "isDefault": false,
  "exportType": "re-export",
  "exportName": "ComponentName",
  "exportPath": "./original-module",
  "isReExported": true
}
```

## Quality Score Ranges

### Complexity
- **Low**: 1-3 (simple functions)
- **Medium**: 4-7 (moderate logic)
- **High**: 8+ (complex functions)

### Maintainability (0-100)
- **Excellent**: 90-100
- **Good**: 70-89
- **Fair**: 50-69
- **Poor**: 0-49

### Coupling (0-10)
- **Low**: 0-3 (few dependencies)
- **Medium**: 4-7 (moderate dependencies)
- **High**: 8-10 (many dependencies)

### Cohesion (1-10)
- **High**: 8-10 (single responsibility)
- **Medium**: 5-7 (moderate focus)
- **Low**: 1-4 (multiple responsibilities)

## Data Sources

| Field | Source | Method |
|-------|--------|---------|
| `complexity` | AST traversal | Control structure counting |
| `parameters` | Function signature | `node.parameters` analysis |
| `returnType` | Type checker | `typeChecker.getTypeFromTypeNode()` |
| `isExported` | Export statements | AST export analysis |
| `jsxReturnType` | JSX detection | AST JSX element search |
| `usageCount` | Identifier counting | AST reference analysis |
| `purpose` | Heuristic rules | Naming + structure analysis |
| `architecturalMetrics` | Calculated | Formula-based scoring |

## Limitations

- **Type Resolution**: Falls back to `'any'` if TypeScript can't resolve
- **Export Detection**: File-level only, no cross-file analysis
- **Quality Metrics**: Simplified formulas, not industry standards
- **Performance**: Linear complexity with file size
- **Accuracy**: Heuristic-based, not ML-trained

## Quick Validation

### ✅ Valid Pattern
```json
{
  "id": "unique-id",
  "name": "functionName",
  "type": "utility-function",
  "filePath": "valid/path.ts",
  "lineNumber": 1,
  "columnNumber": 1,
  "hash": "sha256-hash",
  "metadata": { ... },
  "dependencies": [],
  "exports": []
}
```

### ❌ Missing Required Fields
```json
{
  "name": "functionName",
  // Missing: id, type, filePath, lineNumber, columnNumber, hash, metadata, dependencies, exports
}
```
