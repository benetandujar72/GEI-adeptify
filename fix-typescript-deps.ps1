Write-Host "Arreglando dependencias de TypeScript..." -ForegroundColor Green

# 1. Agregar el package.json corregido
Write-Host "Agregando package.json corregido..." -ForegroundColor Yellow
git add frontend/package.json

# 2. Hacer commit
Write-Host "Haciendo commit..." -ForegroundColor Yellow
git commit -m "fix: Mover tipos TypeScript a dependencies para Render

- Mover @types/react, @types/react-dom, @types/node a dependencies
- Mover typescript a dependencies
- Mantener eslint en devDependencies
- Resolver error de build en Render"

# 3. Hacer push
Write-Host "Haciendo push..." -ForegroundColor Yellow
git push origin feat/backend-frontend-complete

Write-Host "¡Dependencias de TypeScript arregladas!" -ForegroundColor Green
Write-Host "El build en Render debería funcionar ahora" -ForegroundColor Green
