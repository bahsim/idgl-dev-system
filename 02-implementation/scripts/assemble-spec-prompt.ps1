param (
    [Parameter(Mandatory=$true)]
    [string]$TemplatePath,

    [Parameter(Mandatory=$true)]
    [string]$BriefContent,

    [Parameter(Mandatory=$true)]
    [string[]]$ContextContent,

    [Parameter(Mandatory=$false)]
    [string]$OutFile
)

# --- ENGINE IMPORT ---
# Dot-source the reusable template engine to make its functions available.
. "$PSScriptRoot/idgl-template-engine.ps1"

# --- ASSEMBLY ---

# 1. Use the imported engine to compile the main template, resolving all @import statements
$compiledTemplate = Compile-Template -Path $TemplatePath

# 2. Assemble the context block from the string array input.
$contextBlock = ""
for ($i = 0; $i -lt $ContextContent.Length; $i++) {
    $contextBlock += "--- START OF CONTEXT FILE $($i + 1) ---`n"
    $contextBlock += $ContextContent[$i]
    $contextBlock += "`n--- END OF CONTEXT FILE $($i + 1) ---`n`n"
}

# 3. Inject the dynamic content into the compiled template
$finalPrompt = $compiledTemplate -replace '\{\{CONTEXT_BLOCK\}\}', $contextBlock
$finalPrompt = $finalPrompt -replace '\{\{BRIEF_CONTENT\}\}', $BriefContent

# --- SCRIPT OUTPUT ---
# If -OutFile is specified, write to the file. Otherwise, output to the console.
if ($OutFile) {
    $finalPrompt | Out-File -FilePath $OutFile -Encoding utf8
}
else {
    Write-Output $finalPrompt
}
