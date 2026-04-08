$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$publicAssets = Join-Path $projectRoot "public\assets"

if (-not (Test-Path $publicAssets)) {
  throw "Asset directory missing: $publicAssets"
}

Write-Host "Scanning asset references and filenames..." -ForegroundColor Cyan

$referenceFiles = Get-ChildItem -Path $projectRoot -Recurse -Include *.ts,*.tsx -File |
  Where-Object { $_.FullName -notmatch "\\node_modules\\" -and $_.FullName -notmatch "\\.next\\" }

$references = New-Object System.Collections.Generic.HashSet[string]
$missing = @()

foreach ($file in $referenceFiles) {
  $content = [System.IO.File]::ReadAllText($file.FullName)
  [regex]::Matches($content, "/assets/[A-Za-z0-9._-]+") | ForEach-Object {
    $null = $references.Add($_.Value.Replace("/assets/", ""))
  }
}

foreach ($reference in $references) {
  $target = Join-Path $publicAssets $reference
  if (-not (Test-Path $target)) {
    $missing += $reference
  }
}

$invalidNames = Get-ChildItem -Path $publicAssets -File | Where-Object { $_.Name -notmatch "^[a-z0-9.-]+$" }
$oversized = Get-ChildItem -Path $publicAssets -File | Where-Object { $_.Length -gt 1MB }

if ($missing.Count -gt 0) {
  Write-Host "Missing referenced assets:" -ForegroundColor Red
  $missing | Sort-Object | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
}

if ($invalidNames.Count -gt 0) {
  Write-Host "Invalid asset filenames:" -ForegroundColor Red
  $invalidNames | ForEach-Object { Write-Host " - $($_.Name)" -ForegroundColor Red }
}

if ($oversized.Count -gt 0) {
  Write-Host "Oversized assets detected (> 1MB):" -ForegroundColor Yellow
  $oversized | ForEach-Object { Write-Host " - $($_.Name) [$([math]::Round($_.Length / 1KB, 2)) KB]" -ForegroundColor Yellow }
}

if ($missing.Count -gt 0 -or $invalidNames.Count -gt 0) {
  throw "Asset validation failed."
}

Write-Host "Asset validation passed." -ForegroundColor Green
