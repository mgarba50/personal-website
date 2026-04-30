param(
  [switch]$RequireConfiguredPayments
)

$ErrorActionPreference = "Stop"

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
$envExample = Join-Path $projectRoot ".env.example"
$envLocal = Join-Path $projectRoot ".env.local"

Write-Host "Running deployment readiness checks..." -ForegroundColor Cyan

foreach ($path in @(
  "app\page.tsx",
  "app\search\page.tsx",
  "app\sitemap.ts",
  "app\robots.ts",
  "package.json",
  "next.config.ts",
  "README.md"
)) {
  $target = Join-Path $projectRoot $path
  if (-not (Test-Path $target)) {
    throw "Missing required deployment file: $path"
  }
}

if (-not (Test-Path $envExample)) {
  throw ".env.example is missing."
}

$exampleMap = Read-EnvMap -Path $envExample
$expectedEnvKeys = @(
  "NEXT_PUBLIC_SITE_URL",
  "ADMIN_NOTIFICATION_EMAIL",
  "STRIPE_SECRET_KEY",
  "PAYSTACK_SECRET_KEY",
  "DATABASE_URL",
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY"
)

$missingKeys = @($expectedEnvKeys | Where-Object { -not $exampleMap.ContainsKey($_) })
if ($missingKeys.Count -gt 0) {
  throw ".env.example is missing expected keys: $($missingKeys -join ', ')"
}

if ((Test-Path $envLocal) -and $RequireConfiguredPayments) {
  $envMap = Read-EnvMap -Path $envLocal
  $paymentKeys = @("STRIPE_SECRET_KEY", "PAYSTACK_SECRET_KEY")
  $blankPaymentKeys = @($paymentKeys | Where-Object { -not $envMap.ContainsKey($_) -or [string]::IsNullOrWhiteSpace($envMap[$_]) })
  if ($blankPaymentKeys.Count -gt 0) {
    throw "Payment configuration is incomplete: $($blankPaymentKeys -join ', ')"
  }
}

Write-Host "Deployment checks passed." -ForegroundColor Green
