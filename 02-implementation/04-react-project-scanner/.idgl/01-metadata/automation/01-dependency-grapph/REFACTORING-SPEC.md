# Dependency Graph Generator - Refactoring Specification

## Problem Analysis

### Current State
- **3 separate scripts** with 700+ total lines
- **Interface duplication**: `Submodule`, `Project`, `DependencyGraph` repeated in all files
- **File I/O duplication**: `readJsonFile()` function identical across files
- **Project categorization duplication**: Same filtering logic in `mermaid-generator.ts` and `group-diagram-generator.ts`
- **Node ID generation duplication**: `project.id.replace(/[^a-zA-Z0-9]/g, '_')` repeated 6+ times
- **Magic numbers**: Hardcoded limits (20, 17, 30) without explanation
- **Inconsistent error handling**: Silent failures vs. console errors

### Quantified Issues
- **Code duplication**: ~150 lines of identical logic across files
- **Maintenance burden**: Changes require updates in 3 locations
- **Entry point confusion**: Users must know which script to run for which output

### Root Cause
Multiple scripts implementing the same core workflow (scan → parse → categorize → output) with different output formats.

## Solution: Unified Single Script

### Goal
Transform 3 scripts into 1 unified script with multiple output modes, reducing codebase from 700+ lines to ~300 lines while maintaining identical functionality.

### Key Principles
- **Single source of truth** for shared logic
- **Command-line interface** with output mode selection
- **Eliminate all code duplication**
- **Standardize error handling**
- **Remove magic numbers**

## Technical Requirements

### Input Validation
- Workspace root must exist and be readable
- Output directories must be writable
- Command-line arguments must be valid output modes

### Error Handling
- Graceful failure for missing files (return empty arrays, not null)
- Clear error messages for invalid inputs
- Consistent logging format across all operations

### Performance Requirements
- Same execution time as current scripts
- No additional file system operations
- Memory usage should not increase

## Implementation Specification

### Step 1: Extract Shared Types
**File**: `types.ts`
**Purpose**: Eliminate interface duplication
**Content**:
```typescript
export interface Submodule { target: string; path: string; }
export interface Project { id: string; path: string; version: string; submodules: Submodule[]; }
export interface DependencyGraph { projects: Project[]; }
export type OutputMode = 'json' | 'markdown' | 'mermaid';
```

### Step 2: Create Unified Script
**File**: `dependency-graph.ts`
**Purpose**: Single entry point with multiple output modes
**Requirements**:
- Parse command-line arguments for output mode
- Implement shared scanning logic (eliminate duplication)
- Generate outputs based on mode selection
- Standardize error handling across all operations

### Step 3: Update Package Configuration
**File**: `package.json`
**Changes**:
```json
{
  "scripts": {
    "generate": "ts-node dependency-graph.ts",
    "generate:json": "ts-node dependency-graph.ts --json",
    "generate:markdown": "ts-node dependency-graph.ts --markdown", 
    "generate:mermaid": "ts-node dependency-graph.ts --mermaid"
  }
}
```

## Success Criteria

### Functional Requirements
- [ ] All current outputs generated identically
- [ ] Command-line interface accepts output mode arguments
- [ ] Error handling consistent across all operations
- [ ] No silent failures or null returns

### Code Quality Requirements
- [ ] Zero code duplication between files
- [ ] All magic numbers replaced with named constants
- [ ] Single source of truth for project categorization logic
- [ ] Consistent error handling patterns

### Performance Requirements
- [ ] Execution time within 10% of current scripts
- [ ] Memory usage does not increase
- [ ] No additional file system operations

### Maintainability Requirements
- [ ] Changes to core logic require updates in only one location
- [ ] Adding new output modes requires minimal code changes
- [ ] Clear separation between data processing and output generation

## Validation Steps

### Pre-Refactoring Baseline
1. Run current scripts and capture outputs
2. Measure execution time for each script
3. Document current file sizes and line counts

### Post-Refactoring Validation
1. **Output Comparison**: Diff new outputs against baseline
2. **Performance Test**: Compare execution times
3. **Code Analysis**: Verify no duplication exists
4. **Error Testing**: Test with invalid inputs and missing files
5. **Integration Test**: Verify all package scripts work correctly

### Rollback Plan
- Keep original scripts until validation complete
- Use git branches for safe experimentation
- Document exact changes for potential rollback

## Risk Assessment

### Low Risk
- Type extraction (pure refactoring)
- Package script updates (configuration only)

### Medium Risk
- Logic consolidation (potential for introducing bugs)
- Error handling changes (may alter behavior)

### Mitigation Strategies
- Comprehensive testing against baseline outputs
- Incremental implementation with validation at each step
- Clear rollback procedures

## Files to Create
- `types.ts` (shared interfaces)
- `dependency-graph.ts` (unified script)

## Files to Remove
- `dependency-graph-generator.ts`
- `mermaid-generator.ts`
- `group-diagram-generator.ts`

## Timeline
- **Step 1**: 1 hour (type extraction)
- **Step 2**: 4 hours (unified script implementation)
- **Step 3**: 30 minutes (package updates)
- **Validation**: 2 hours (testing and comparison)
- **Total**: 7.5 hours

This specification provides concrete, measurable requirements and clear validation criteria for a successful refactoring.
