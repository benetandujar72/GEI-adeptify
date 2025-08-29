Write-Host "Haciendo commit de la estructura del frontend..." -ForegroundColor Green

# 1. Agregar archivos al staging
Write-Host "Agregando archivos al staging..." -ForegroundColor Yellow
git add frontend/app/layout.tsx
git add frontend/app/page.tsx
git add frontend/app/globals.css
git add frontend/public/.gitkeep
git add frontend/README.md
git add fix-dependencies.ps1
git add SOLUCION_DEPENDENCIAS.md
git add commit-estructura.ps1

# 2. Verificar estado
Write-Host "Estado del repositorio:" -ForegroundColor Yellow
git status

# 3. Hacer commit
Write-Host "Haciendo commit..." -ForegroundColor Yellow
git commit -m "feat: Agregar estructura básica del frontend con App Router

- Crear directorio app con layout.tsx y page.tsx
- Agregar globals.css con configuración de Tailwind
- Crear directorio public
- Agregar README.md con documentación
- Estructura mínima para que Next.js pueda hacer build"

# 4. Hacer push
Write-Host "Haciendo push..." -ForegroundColor Yellow
git push origin feat/ai-gamification-engine

Write-Host "¡Estructura del frontend completada y push exitoso!" -ForegroundColor Green
