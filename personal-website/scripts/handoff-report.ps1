$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$outputPath = Join-Path $projectRoot "docs\generated-handoff-report.md"
$pageFiles = Get-ChildItem -Path (Join-Path $projectRoot "app") -Recurse -Filter page.tsx | Sort-Object FullName
$scriptFiles = Get-ChildItem -Path (Join-Path $projectRoot "scripts") -Filter *.ps1 | Sort-Object Name
$collectionFiles = Get-ChildItem -Path (Join-Path $projectRoot "content\collections") -Filter *.ts | Sort-Object Name
$envLines = Get-Content (Join-Path $projectRoot ".env.example") | Where-Object { $_ -match "=" -and $_ -notmatch "^\s*#" }

$report = @(
  "# Handoff Report"
  ""
  "Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")"
  ""
  "## Pages"
)

$report += $pageFiles | ForEach-Object {
  "- " + $_.FullName.Replace($projectRoot + "\", "")
}

$report += ""
$report += "## Content collections"
$report += $collectionFiles | ForEach-Object {
  "- " + $_.Name
}

$report += ""
$report += "## Environment variables"
$report += $envLines | ForEach-Object {
  "- " + ($_ -split "=", 2)[0]
}

$report += ""
$report += "## PowerShell scripts"
$report += $scriptFiles | ForEach-Object {
  "- " + $_.Name
}

$report += ""
$report += "## Final owner steps"
$report += "- Install Node.js 20+ and npm 10+"
$report += "- Populate .env.local with real values"
$report += "- Replace placeholder assets and copy"
$report += "- Run build-production.ps1 and deploy-check.ps1"
$report += "- Push to GitHub and deploy from the personal-website directory"

Set-Content -Path $outputPath -Value $report

Write-Host "Handoff report written to $outputPath" -ForegroundColor Green
