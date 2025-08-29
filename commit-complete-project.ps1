Write-Host "Haciendo commit del proyecto completo (Backend + Frontend)..." -ForegroundColor Green

# 1. Agregar todos los archivos al staging
Write-Host "Agregando archivos al staging..." -ForegroundColor Yellow
git add .

# 2. Verificar estado
Write-Host "Estado del repositorio:" -ForegroundColor Yellow
git status

# 3. Hacer commit
Write-Host "Haciendo commit..." -ForegroundColor Yellow
git commit -m "feat: Proyecto completo GEI Adeptify

BACKEND:
- API REST con NestJS
- Módulos: auth, users, academic, ai, analytics, communications, gamification, health, public, reservations, resources, schools, tasks, wellbeing
- Base de datos PostgreSQL
- Autenticación JWT
- Integración con Gemini AI
- Tests unitarios y e2e
- Docker y configuración para Render

FRONTEND:
- Next.js 14 con App Router
- Sistema de autenticación completo
- Dashboard con todos los módulos
- Asistente IA con chat interactivo
- Páginas: login, registro, progreso, gamificación, comunicaciones, bienestar, recursos
- Diseño responsive con Tailwind CSS
- Context API para estado global
- Navegación completa entre páginas

CONFIGURACIÓN:
- Render.yaml para despliegue automático
- Docker Compose para desarrollo
- Variables de entorno configuradas
- Scripts de build y deploy"

# 4. Hacer push
Write-Host "Haciendo push..." -ForegroundColor Yellow
git push origin feat/backend-frontend-complete

Write-Host "¡Proyecto completo subido exitosamente!" -ForegroundColor Green
Write-Host "Backend y Frontend están listos para deploy en Render" -ForegroundColor Green
