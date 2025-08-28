# Script para actualizar cambios en GitHub
Write-Host "🔄 Actualizando cambios en GitHub..." -ForegroundColor Green

# Verificar estado del repositorio
Write-Host "📊 Verificando estado del repositorio..." -ForegroundColor Yellow
git status

# Agregar todos los cambios
Write-Host "📁 Agregando archivos modificados..." -ForegroundColor Yellow
git add .

# Hacer commit
Write-Host "💾 Haciendo commit de los cambios..." -ForegroundColor Yellow
git commit -m "fix: Solucionar errores de build para Render

- Agregar configuración de Jest y TypeScript
- Crear archivos de configuración para tests e2e
- Agregar configuración para Render deployment
- Instalar dependencias faltantes (dotenv)
- Corregir configuración de TypeScript para build
- Crear archivos de configuración para Docker y Render"

# Verificar si hay un repositorio remoto
Write-Host "🌐 Verificando repositorio remoto..." -ForegroundColor Yellow
git remote -v

# Hacer push (si existe un remoto)
Write-Host "🚀 Haciendo push de los cambios..." -ForegroundColor Yellow
git push origin main

Write-Host "✅ Cambios actualizados exitosamente!" -ForegroundColor Green
