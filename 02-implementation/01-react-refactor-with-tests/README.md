## React Refactor with Tests — Example

This folder demonstrates the Spec Compilation workflow on a small React refactor.

Quickstart (from `idgl-dev-system/02-implementation/scripts`):

```powershell
./compile-spec-from-files.ps1 `
  -BriefPath ../01-react-refactor-with-tests/brief.md `
  -ContextPaths ../01-react-refactor-with-tests/ProductList.before.tsx `
  -OutFile ../01-react-refactor-with-tests/generated-spec.md
```

Outputs `generated-spec.md`, a formal Spec including verification criteria and exemplars (tests by default).

