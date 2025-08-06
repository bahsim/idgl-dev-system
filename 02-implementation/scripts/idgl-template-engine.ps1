# IDGL Template Engine Module
# Contains reusable functions for processing IDGL prompt templates.

function Compile-Template {
    param (
        [Parameter(Mandatory=$true)]
        [string]$Path
    )

    $templateContent = Get-Content -Path $Path -Raw
    $templateDir = Split-Path -Path $Path -Parent

    # Find all @import statements
    $importMatches = $templateContent | Select-String -Pattern '@import "([^"]+)"' -AllMatches

    if ($importMatches) {
        foreach ($match in $importMatches.Matches) {
            $importPath = $match.Groups[1].Value
            $partialPath = Join-Path -Path $templateDir -ChildPath $importPath
            
            # Recurse to compile the partial, passing the engine path for context
            $partialContent = Compile-Template -Path $partialPath
            
            # Replace the @import line with the content of the partial
            $templateContent = $templateContent.Replace($match.Value, $partialContent)
        }
    }
    
    return $templateContent
}

# Export the function so it can be used by other scripts that dot-source this file.
Export-ModuleMember -Function Compile-Template
