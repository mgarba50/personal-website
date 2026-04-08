$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$backupRoot = Join-Path $projectRoot "backup"
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$stagingRoot = Join-Path $backupRoot "staging-$stamp"
$archivePath = Join-Path $backupRoot "musaallama-backup-$stamp.zip"

if (-not (Test-Path $backupRoot)) {
  New-Item -ItemType Directory -Path $backupRoot | Out-Null
}

New-Item -ItemType Directory -Path $stagingRoot | Out-Null

Write-Host "Creating backup staging area..." -ForegroundColor Cyan

foreach ($path in @("content", "docs", "public\assets", "scripts", ".env.example")) {
  $source = Join-Path $projectRoot $path
  if (Test-Path $source) {
    Copy-Item -Path $source -Destination $stagingRoot -Recurse -Force
  }
}

Compress-Archive -Path (Join-Path $stagingRoot "*") -DestinationPath $archivePath -Force
Remove-Item -LiteralPath $stagingRoot -Recurse -Force

Write-Host "Backup archive created: $archivePath" -ForegroundColor Green
