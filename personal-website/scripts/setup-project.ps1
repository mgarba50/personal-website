param(
  [switch]$ForceEnvCopy
)

$ErrorActionPreference = "Stop"

function Assert-Command {
  param([string]$Name)

  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "$Name is not available in PATH. Install it before continuing."
  }
}

$projectRoot = Split-Path -Parent $PSScriptRoot
$envExample = Join-Path $projectRoot ".env.example"
$envLocal = Join-Path $projectRoot ".env.local"

Write-Host "Preparing MusaAllama.com institutional platform..." -ForegroundColor Cyan

Assert-Command "node"
Assert-Command "npm"

$nodeVersion = node -v
Write-Host "Detected Node version: $nodeVersion" -ForegroundColor Green

foreach ($folder in @("backup", "docs", "public\assets")) {
  $target = Join-Path $projectRoot $folder
  if (-not (Test-Path $target)) {
    New-Item -ItemType Directory -Path $target | Out-Null
    Write-Host "Created folder: $target" -ForegroundColor Yellow
  }
}

if (-not (Test-Path $envExample)) {
  throw ".env.example is missing. Cannot create local environment template."
}

if ($ForceEnvCopy -or -not (Test-Path $envLocal)) {
  Copy-Item -Path $envExample -Destination $envLocal -Force
  Write-Host "Prepared .env.local from .env.example" -ForegroundColor Green
} else {
  Write-Host ".env.local already exists. Leaving it untouched." -ForegroundColor Yellow
}

Write-Host "Installing npm dependencies..." -ForegroundColor Cyan
Push-Location $projectRoot
try {
  npm install
} finally {
  Pop-Location
}

Write-Host "Setup complete. Next steps:" -ForegroundColor Green
Write-Host "1. Update .env.local with real values." -ForegroundColor White
Write-Host "2. Run .\scripts\run-dev.ps1" -ForegroundColor White
