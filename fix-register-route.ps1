Write-Host "Arreglando ruta de registro..." -ForegroundColor Green

# 1. Agregar solo la página de registro
Write-Host "Agregando página de registro..." -ForegroundColor Yellow
git add frontend/app/register/page.tsx
git add commit-funcionalidades.ps1

# 2. Hacer commit
Write-Host "Haciendo commit..." -ForegroundColor Yellow
git commit -m "fix: Agregar página de registro para resolver error de ruta

- Crear página de registro funcional
- Resolver error de TypeScript en rutas
- Permitir navegación a /register"

# 3. Hacer push
Write-Host "Haciendo push..." -ForegroundColor Yellow
git push origin feat/ai-gamification-engine

Write-Host "¡Ruta de registro arreglada y push exitoso!" -ForegroundColor Green
