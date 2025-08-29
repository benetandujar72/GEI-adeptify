Write-Host "Solución definitiva para limpiar historial de Git..." -ForegroundColor Green

# 1. Crear un nuevo branch limpio desde el commit inicial
Write-Host "Creando nuevo branch limpio..." -ForegroundColor Yellow
git checkout --orphan temp-branch

# 2. Eliminar todos los archivos del staging
Write-Host "Limpiando staging area..." -ForegroundColor Yellow
git rm -rf .

# 3. Eliminar archivos físicamente
Write-Host "Eliminando archivos grandes..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "✅ node_modules eliminado" -ForegroundColor Green
}

if (Test-Path "frontend/node_modules") {
    Remove-Item -Recurse -Force "frontend/node_modules"
    Write-Host "✅ frontend/node_modules eliminado" -ForegroundColor Green
}

if (Test-Path "frontend/.next") {
    Remove-Item -Recurse -Force "frontend/.next"
    Write-Host "✅ frontend/.next eliminado" -ForegroundColor Green
}

if (Test-Path "backend/node_modules") {
    Remove-Item -Recurse -Force "backend/node_modules"
    Write-Host "✅ backend/node_modules eliminado" -ForegroundColor Green
}

if (Test-Path "backend/dist") {
    Remove-Item -Recurse -Force "backend/dist"
    Write-Host "✅ backend/dist eliminado" -ForegroundColor Green
}

# 4. Agregar .gitignore primero
Write-Host "Agregando .gitignore..." -ForegroundColor Yellow
git add .gitignore
git commit -m "chore: Agregar .gitignore para excluir archivos grandes"

# 5. Agregar solo archivos necesarios
Write-Host "Agregando archivos necesarios..." -ForegroundColor Yellow

# Archivos de configuración
git add render.yaml
git add frontend/package.json
git add frontend/tailwind.config.js
git add frontend/.npmrc
git add frontend/next.config.js
git add frontend/tsconfig.json
git add frontend/postcss.config.js

# Código fuente (solo si existen)
if (Test-Path "frontend/app") {
    git add frontend/app/
    Write-Host "✅ frontend/app agregado" -ForegroundColor Green
}

if (Test-Path "frontend/src") {
    git add frontend/src/
    Write-Host "✅ frontend/src agregado" -ForegroundColor Green
}

if (Test-Path "frontend/public") {
    git add frontend/public/
    Write-Host "✅ frontend/public agregado" -ForegroundColor Green
}

# Documentación
git add SOLUCION_AUTOPREFIXER.md
git add SOLUCION_ARCHIVOS_GRANDES.md
git add limpiar-repositorio.ps1
git add solucion-definitiva.ps1

# 6. Hacer commit
Write-Host "Haciendo commit..." -ForegroundColor Yellow
git commit -m "feat: Frontend completo con solución para Render

- Configuración completa de Next.js con App Router
- Integración con Tailwind CSS y PostCSS
- Configuración de Render con rootDir: frontend
- Solución para error de autoprefixer
- Componentes de dashboard y autenticación
- Servicios de API y contextos de React
- Documentación completa de la solución"

# 7. Eliminar el branch anterior y renombrar el nuevo
Write-Host "Renombrando branch..." -ForegroundColor Yellow
git branch -D feat/ai-gamification-engine
git branch -m feat/ai-gamification-engine

# 8. Verificar estado
Write-Host "Estado del repositorio:" -ForegroundColor Yellow
git status

Write-Host "¡Branch limpio creado! Ahora puedes hacer push." -ForegroundColor Green
Write-Host "Comando para push: git push --set-upstream origin feat/ai-gamification-engine" -ForegroundColor Cyan
