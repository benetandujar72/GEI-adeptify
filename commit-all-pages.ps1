Write-Host "Haciendo commit de todas las páginas del dashboard..." -ForegroundColor Green

# 1. Agregar todas las páginas al staging
Write-Host "Agregando páginas al staging..." -ForegroundColor Yellow
git add frontend/app/dashboard/progress/page.tsx
git add frontend/app/dashboard/gamification/page.tsx
git add frontend/app/dashboard/communications/page.tsx
git add frontend/app/dashboard/wellness/page.tsx
git add frontend/app/dashboard/resources/page.tsx
git add commit-all-pages.ps1

# 2. Verificar estado
Write-Host "Estado del repositorio:" -ForegroundColor Yellow
git status

# 3. Hacer commit
Write-Host "Haciendo commit..." -ForegroundColor Yellow
git commit -m "feat: Agregar todas las páginas del dashboard

- Página de progreso académico con estadísticas
- Página de gamificación con logros y desafíos
- Página de comunicaciones con mensajes
- Página de bienestar y salud
- Página de recursos educativos
- Navegación completa entre todas las secciones
- Diseño consistente y funcional"

# 4. Hacer push
Write-Host "Haciendo push..." -ForegroundColor Yellow
git push origin feat/ai-gamification-engine

Write-Host "¡Todas las páginas agregadas y push exitoso!" -ForegroundColor Green
