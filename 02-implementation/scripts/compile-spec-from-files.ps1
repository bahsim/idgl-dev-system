param (
    [Parameter(Mandatory=$false)]
    [string]$TemplatePath,

    [Parameter(Mandatory=$true)]
    [string]$BriefPath,

    [Parameter(Mandatory=$true)]
    [string[]]$ContextPaths,

    [Parameter(Mandatory=$false)]
    [string]$OutFile
)

# Resolve default template path if not provided
if (-not $TemplatePath -or [string]::IsNullOrWhiteSpace($TemplatePath)) {
    $TemplatePath = Join-Path -Path $PSScriptRoot -ChildPath 'prompt-templates/spec-compiler.md'
}

# Load input contents
$briefContent = Get-Content -Path $BriefPath -Raw

$contextContents = @()
foreach ($contextPath in $ContextPaths) {
    $contextContents += ,(Get-Content -Path $contextPath -Raw)
}

# Call the assembler
$assemblerPath = Join-Path -Path $PSScriptRoot -ChildPath 'assemble-spec-prompt.ps1'

if ($OutFile) {
    & $assemblerPath -TemplatePath $TemplatePath -BriefContent $briefContent -ContextContent $contextContents -OutFile $OutFile
}
else {
    & $assemblerPath -TemplatePath $TemplatePath -BriefContent $briefContent -ContextContent $contextContents
}


