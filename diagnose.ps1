Write-Host "`n=== Portfolio Health Check ===" -ForegroundColor Cyan

# 1. node_modules
Write-Host "`n[1] Checking node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    $count = (Get-ChildItem node_modules -Directory -ErrorAction SilentlyContinue).Count
    Write-Host "  OK: $count packages installed" -ForegroundColor Green
} else {
    Write-Host "  ERROR: node_modules missing!" -ForegroundColor Red
}

# 2. Critical packages
Write-Host "`n[2] Checking critical packages..." -ForegroundColor Yellow
$critical = @("next", "react", "react-dom", "@react-three/fiber", "framer-motion")
foreach ($pkg in $critical) {
    if (Test-Path "node_modules\$pkg") {
        Write-Host "  OK: $pkg" -ForegroundColor Green
    } else {
        Write-Host "  MISSING: $pkg" -ForegroundColor Red
    }
}

# 3. .next cache
Write-Host "`n[3] Checking .next cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Write-Host "  OK: .next exists" -ForegroundColor Green
} else {
    Write-Host "  INFO: .next doesn't exist (will be created)" -ForegroundColor Gray
}

# 4. package-lock.json
Write-Host "`n[4] Checking package-lock.json..." -ForegroundColor Yellow
if (Test-Path "package-lock.json") {
    try {
        $null = Get-Content "package-lock.json" -Raw | ConvertFrom-Json
        Write-Host "  OK: package-lock.json is valid" -ForegroundColor Green
    } catch {
        Write-Host "  ERROR: package-lock.json is corrupted!" -ForegroundColor Red
    }
} else {
    Write-Host "  ERROR: package-lock.json missing!" -ForegroundColor Red
}

# 5. Node version
Write-Host "`n[5] Checking Node.js version..." -ForegroundColor Yellow
$nodeVer = (node --version)
Write-Host "  INFO: $nodeVer" -ForegroundColor Cyan

# 6. TypeScript check
Write-Host "`n[6] Running TypeScript check..." -ForegroundColor Yellow
$tsc = npx tsc --noEmit 2>&1 | Out-String
if ($LASTEXITCODE -eq 0) {
    Write-Host "  OK: No TypeScript errors" -ForegroundColor Green
} else {
    Write-Host "  ERROR: TypeScript errors found" -ForegroundColor Red
    Write-Host $tsc.Substring(0, [Math]::Min(500, $tsc.Length)) -ForegroundColor Red
}

# 7. Build test
Write-Host "`n[7] Testing build..." -ForegroundColor Yellow
$buildOutput = npm run build 2>&1 | Out-String
if ($LASTEXITCODE -eq 0) {
    Write-Host "  OK: Build succeeds" -ForegroundColor Green
} else {
    Write-Host "  ERROR: Build fails!" -ForegroundColor Red
    Write-Host $buildOutput.Substring(0, [Math]::Min(500, $buildOutput.Length)) -ForegroundColor Red
}

Write-Host "`n=== DIAGNOSTIC COMPLETE ===" -ForegroundColor Cyan
