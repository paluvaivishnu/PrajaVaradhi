@echo off
echo ========================================
echo PrajaVaradhi GitHub Push Script
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    echo After installation, run this script again.
    pause
    exit /b 1
)

echo [OK] Git is installed
echo.

echo Initializing Git repository...
git init
echo.

echo Adding files to Git...
git add .
echo.

echo Creating initial commit...
git commit -m "Initial commit: PrajaVaradhi - Citizen Complaint Management System"
echo.

echo Setting main branch...
git branch -M main
echo.

echo Adding remote repository...
git remote add origin https://github.com/paluvaivishnu/PrajaVaradhi.git
echo.

echo Pushing to GitHub...
echo You may be prompted for GitHub credentials...
git push -u origin main

echo.
echo ========================================
echo Successfully pushed to GitHub!
echo ========================================
echo.
echo Repository URL: https://github.com/paluvaivishnu/PrajaVaradhi
echo.

pause
