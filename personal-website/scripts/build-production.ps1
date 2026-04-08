$ErrorActionPreference = "Stop"

function Assert-Command {
  param([string]$Name)

  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "$Name is not available in PATH. Install it before continuing."
  }
}

$projectRoot = Split-Path -Parent $PSScriptRoot

Assert-Command "node"
Assert-Command "npm"

Write-Host "Running production build pipeline..." -ForegroundColor Cyan

& (Join-Path $PSScriptRoot "content-check.ps1")
& (Join-Path $PSScriptRoot "validate-assets.ps1")

Push-Location $projectRoot
try {
  npm run lint
  npm run typecheck
  npm run test
  npm run build
} finally {
  Pop-Location
}

Write-Host "Production build pipeline completed successfully." -ForegroundColor Green
