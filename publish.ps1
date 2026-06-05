# SkillForge — publish to GitHub (and auto-deploy on Vercel)
# Usage:
#   .\publish.ps1                      -> uses a default commit message
#   .\publish.ps1 "describe my change" -> uses your message

param(
    [string]$Message = "Update SkillForge content"
)

Write-Host ""
Write-Host "Publishing SkillForge..." -ForegroundColor Cyan

git add -A
git commit -m $Message

if ($LASTEXITCODE -ne 0) {
    Write-Host "Nothing to commit (no changes detected) - pushing anyway..." -ForegroundColor Yellow
}

git push

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Pushed successfully. Vercel is now building..." -ForegroundColor Green
    Write-Host "Live site: https://skill-forge-oxnk.vercel.app" -ForegroundColor Green
    Write-Host "Build status: https://vercel.com/dashboard" -ForegroundColor DarkGray
} else {
    Write-Host ""
    Write-Host "Push failed - check the error above." -ForegroundColor Red
}
