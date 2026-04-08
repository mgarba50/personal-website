param(
  [switch]$SkipEnvCheck
)

$ErrorActionPreference = "Stop"

function Assert-Command {
  param([string]$Name)

  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "$Name is not available in PATH. Install it before continuing."
  }
}

function Read-EnvMap {
  param([string]$Path)

  $map = @{}
  if (-not (Test-Path $Path)) {
    return $map
  }

  foreach ($line in Get-Content $Path) {
    if ($line -match "^\s*#" -or [string]::IsNullOrWhiteSpace($line)) {
      continue
    }

    $parts = $line -split "=", 2
    if ($parts.Count -eq 2) {
      $map[$parts[0].Trim()] = $parts[1].Trim()
    }
  }

  return $map
}

$projectRoot = Split-Path -Parent $PSScriptRoot
$envLocal = Join-Path $projectRoot ".env.local"

Assert-Command "node"
Assert-Command "npm"

if (-not $SkipEnvCheck) {
  if (-not (Test-Path $envLocal)) {
    throw ".env.local is missing. Run .\scripts\setup-project.ps1 first."
  }

  $envMap = Read-EnvMap -Path $envLocal
  $required = @("NEXT_PUBLIC_SITE_URL", "ADMIN_NOTIFICATION_EMAIL")
  $missing = @($required | Where-Object { -not $envMap.ContainsKey($_) -or [string]::IsNullOrWhiteSpace($envMap[$_]) })

  if ($missing.Count -gt 0) {
    throw "Missing required development environment values: $($missing -join ', ')"
  }

  $optionalWarnings = @("RESEND_API_KEY", "STRIPE_SECRET_KEY", "PAYSTACK_SECRET_KEY") |
    Where-Object { -not $envMap.ContainsKey($_) -or [string]::IsNullOrWhiteSpace($envMap[$_]) }

  if ($optionalWarnings.Count -gt 0) {
    Write-Host "Optional integrations still inactive: $($optionalWarnings -join ', ')" -ForegroundColor Yellow
  }
}

Write-Host "Starting local development server..." -ForegroundColor Cyan
Push-Location $projectRoot
try {
  npm run dev
} finally {
  Pop-Location
}
