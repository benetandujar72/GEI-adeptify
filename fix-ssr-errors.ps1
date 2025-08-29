Write-Host "Arreglando errores de SSR..." -ForegroundColor Green

# 1. Agregar archivos corregidos
Write-Host "Agregando archivos corregidos..." -ForegroundColor Yellow
git add frontend/src/contexts/AuthContext.tsx
git add frontend/app/page.tsx

# 2. Hacer commit
Write-Host "Haciendo commit..." -ForegroundColor Yellow
git commit -m "fix: Resolver errores de SSR y hidratación

- Agregar verificación de mounted en AuthContext
- Agregar verificación de mounted en página principal
- Manejar localStorage de forma segura en SSR
- Evitar errores de hidratación entre servidor y cliente
- Resolver error 502 en Render"

# 3. Hacer push
Write-Host "Haciendo push..." -ForegroundColor Yellow
git push origin feat/backend-frontend-complete

Write-Host "¡Errores de SSR arreglados!" -ForegroundColor Green
Write-Host "El error 502 debería resolverse ahora" -ForegroundColor Green
