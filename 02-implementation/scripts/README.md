# IDGL System Scripts

This directory contains reusable, universal scripts that support the Intent-Driven Generative Lifecycle (IDGL) workflow.

The system is architected around a core, reusable template engine and consumer scripts that use it. This provides a clean separation of concerns and allows for a scalable and maintainable toolchain.

---

## Core Engine (`idgl-template-engine.ps1`)

This script is the core utility library for the prompt assembly system. It contains the `Compile-Template` function, which is responsible for reading a template file and recursively resolving all `@import` statements to produce a single, "compiled" string. It is designed to be "dot-sourced" (imported) by other scripts.

## Consumer Scripts

These are scripts designed to perform a specific task. They use the core engine to handle the template compilation.

### `assemble-spec-prompt.ps1`

This is a consumer script that assembles the meta-prompt for the "Spec Compiler" AI. It imports the `Compile-Template` function from the engine and then performs the final step of injecting the dynamic brief and context content into the compiled template.

### Parameters

*   `-TemplatePath [string]` (Mandatory): The path to the main prompt template file (e.g., `./prompt-templates/spec-compiler.md`).
*   `-BriefContent [string]` (Mandatory): The string content of the high-level human brief.
*   `-ContextContent [string[]]` (Mandatory): An array of strings, where each string is the full content of a relevant source file.

### Usage Example

```powershell
# 1. Gather context into variables
$brief = Get-Content -Path <path-to-brief.md> -Raw
$source = Get-Content -Path <path-to-source-code.tsx> -Raw

# 2. Call the consumer script, which will use the engine internally
./assemble-spec-prompt.ps1 -TemplatePath ./prompt-templates/spec-compiler.md -BriefContent $brief -ContextContent $source
```

### `compile-spec-from-files.ps1`

Convenience wrapper that takes file paths, reads them, and invokes `assemble-spec-prompt.ps1`.

Parameters

- `-TemplatePath [string]` (Optional): Defaults to `./prompt-templates/spec-compiler.md` in this directory.
- `-BriefPath [string]` (Required): Path to the human brief (Markdown or text).
- `-ContextPaths [string[]]` (Required): One or more paths to source files that form the context block.
- `-OutFile [string]` (Optional): If provided, writes the final compiled prompt to this file.

Usage Example

```powershell
./compile-spec-from-files.ps1 `
  -BriefPath ../01-react-refactor-with-tests/brief.md `
  -ContextPaths ../01-react-refactor-with-tests/ProductList.before.tsx `
  -OutFile ../01-react-refactor-with-tests/generated-spec.md
```
