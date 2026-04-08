$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$collectionsRoot = Join-Path $projectRoot "content\collections"

if (-not (Test-Path $collectionsRoot)) {
  throw "Collections directory missing: $collectionsRoot"
}

Write-Host "Checking content collections..." -ForegroundColor Cyan

$requiredFiles = @(
  "articles.ts",
  "books.ts",
  "courses.ts",
  "initiatives.ts",
  "media.ts",
  "poems.ts",
  "products.ts",
  "services.ts"
)

$missingFiles = @($requiredFiles | Where-Object { -not (Test-Path (Join-Path $collectionsRoot $_)) })
if ($missingFiles.Count -gt 0) {
  throw "Missing content collection files: $($missingFiles -join ', ')"
}

$slugMatches = @()
$titleMatches = @()

Get-ChildItem -Path $collectionsRoot -Filter *.ts | ForEach-Object {
  $raw = Get-Content $_.FullName -Raw
  $slugMatches += [regex]::Matches($raw, 'slug:\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
  $titleMatches += [regex]::Matches($raw, 'title:\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
}

$duplicateSlugs = $slugMatches | Group-Object | Where-Object { $_.Count -gt 1 }
$blankTitles = $titleMatches | Where-Object { [string]::IsNullOrWhiteSpace($_) }

if ($duplicateSlugs.Count -gt 0) {
  Write-Host "Duplicate slugs detected:" -ForegroundColor Red
  $duplicateSlugs | ForEach-Object { Write-Host " - $($_.Name)" -ForegroundColor Red }
  throw "Content validation failed because duplicate slugs were found."
}

if ($blankTitles.Count -gt 0) {
  throw "Content validation failed because one or more titles are blank."
}

Write-Host "Content validation passed. Slugs checked: $($slugMatches.Count)" -ForegroundColor Green
