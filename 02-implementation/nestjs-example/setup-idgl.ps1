# This script scaffolds the initial IDGL directory structure for a project.
# It should be run from the workspace root directory.

$basePath = ".idgl/01-scaffolding-phase"

Write-Host "Creating IDGL structure in '$basePath'..."

# Create phase directory and subdirectories for standard tasks
# The -Force parameter ensures that parent directories are created if they don't exist.
New-Item -ItemType Directory -Path (Join-Path $basePath "01_system_design/artifact") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $basePath "01_system_design/history") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $basePath "02_comprehensive_plan/artifact") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $basePath "02_comprehensive_plan/history") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $basePath "03_execution") -Force | Out-Null

# Create placeholder files with initial content
Set-Content -Path (Join-Path $basePath "main_goal.md") -Value "# Main Goal: Scaffolding Phase`n`nThis phase is for the initial scaffolding of the NestJS project."
Set-Content -Path (Join-Path $basePath "01_system_design/intent.md") -Value "# Intent: System Design`n`nBased on the Main Goal, design the high-level architecture for the project."
New-Item -Path (Join-Path $basePath "01_system_design/validation_summary.md") -ItemType File | Out-Null
Set-Content -Path (Join-Path $basePath "02_comprehensive_plan/intent.md") -Value "# Intent: Comprehensive Plan`n`nUsing the System Design artifact, define all decomposition, research, and compilation tasks needed."
New-Item -Path (Join-Path $basePath "02_comprehensive_plan/validation_summary.md") -ItemType File | Out-Null
Set-Content -Path (Join-Path $basePath "03_execution/README.md") -Value "This directory will be populated with generative tasks based on the output of the '02_comprehensive_plan' task."

# Add .gitkeep files to the empty directories to ensure they are tracked by git
New-Item -Path (Join-Path $basePath "01_system_design/artifact/.gitkeep") -ItemType File | Out-Null
New-Item -Path (Join-Path $basePath "01_system_design/history/.gitkeep") -ItemType File | Out-Null
New-Item -Path (Join-Path $basePath "02_comprehensive_plan/artifact/.gitkeep") -ItemType File | Out-Null
New-Item -Path (Join-Path $basePath "02_comprehensive_plan/history/.gitkeep") -ItemType File | Out-Null


Write-Host "IDGL directory structure created successfully in '$projectPath/.idgl'" 