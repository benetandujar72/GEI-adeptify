Write-Host "Haciendo commit de las funcionalidades del frontend..." -ForegroundColor Green

# 1. Agregar archivos al staging
Write-Host "Agregando archivos al staging..." -ForegroundColor Yellow
git add frontend/src/types/auth.ts
git add frontend/src/contexts/AuthContext.tsx
git add frontend/src/components/auth/LoginForm.tsx
git add frontend/src/components/dashboard/Dashboard.tsx
git add frontend/app/layout.tsx
git add frontend/app/page.tsx
git add frontend/app/login/page.tsx
git add frontend/app/register/page.tsx
git add frontend/app/dashboard/page.tsx
git add frontend/app/dashboard/ai/page.tsx
git add commit-funcionalidades.ps1

# 2. Verificar estado
Write-Host "Estado del repositorio:" -ForegroundColor Yellow
git status

# 3. Hacer commit
Write-Host "Haciendo commit..." -ForegroundColor Yellow
git commit -m "feat: Agregar funcionalidades completas del frontend

- Sistema de autenticación con contexto y localStorage
- Dashboard principal con navegación a módulos
- Asistente IA con chat interactivo
- Página de login funcional
- Página de registro funcional
- Navegación entre páginas
- Diseño responsive con Tailwind CSS
- Interfaz moderna y profesional"

# 4. Hacer push
Write-Host "Haciendo push..." -ForegroundColor Yellow
git push origin feat/ai-gamification-engine

Write-Host "¡Funcionalidades completas agregadas y push exitoso!" -ForegroundColor Green
