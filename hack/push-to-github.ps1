# PrajaVaradhi - GitHub Push Script
# Run this script after installing Git

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PrajaVaradhi GitHub Push Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
}
catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "After installation, restart PowerShell and run this script again." -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "Initializing Git repository..." -ForegroundColor Yellow

# Initialize Git repository
git init

Write-Host "✓ Repository initialized" -ForegroundColor Green
Write-Host ""

# Configure Git user (optional - update with your details)
Write-Host "Configuring Git user..." -ForegroundColor Yellow
$userName = Read-Host "Enter your Git username (or press Enter to skip)"
if ($userName) {
    git config user.name "$userName"
    Write-Host "✓ Username set to: $userName" -ForegroundColor Green
}

$userEmail = Read-Host "Enter your Git email (or press Enter to skip)"
if ($userEmail) {
    git config user.email "$userEmail"
    Write-Host "✓ Email set to: $userEmail" -ForegroundColor Green
}

Write-Host ""
Write-Host "Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✓ Files added" -ForegroundColor Green

Write-Host ""
Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: PrajaVaradhi - Citizen Complaint Management System"

Write-Host "✓ Commit created" -ForegroundColor Green

Write-Host ""
Write-Host "Setting main branch..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ Branch set to 'main'" -ForegroundColor Green

Write-Host ""
Write-Host "Adding remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/paluvaivishnu/PrajaVaradhi.git
Write-Host "✓ Remote added" -ForegroundColor Green

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "You may be prompted for GitHub credentials..." -ForegroundColor Cyan

git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repository URL: https://github.com/paluvaivishnu/PrajaVaradhi" -ForegroundColor Cyan
Write-Host ""

pause
