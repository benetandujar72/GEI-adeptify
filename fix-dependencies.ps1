Write-Host "Corrigiendo dependencias..." -ForegroundColor Green

# 1. Actualizar package.json con versiones compatibles
Write-Host "Actualizando frontend/package.json..." -ForegroundColor Yellow
@"
{
  "name": "gei-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.32",
    "react": "^18",
    "react-dom": "^18",
    "@nextui-org/react": "^2.2.9",
    "framer-motion": "^11.5.6",
    "next-themes": "^0.4.6",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.32"
  }
}
"@ | Out-File -FilePath "frontend/package.json" -Encoding UTF8

# 2. Agregar archivo al staging
Write-Host "Agregando archivo al staging..." -ForegroundColor Yellow
git add frontend/package.json

# 3. Hacer commit
Write-Host "Haciendo commit..." -ForegroundColor Yellow
git commit -m "fix: Actualizar framer-motion para compatibilidad con NextUI

- Actualizar framer-motion de ^10.16.4 a ^11.5.6
- Esto resuelve el conflicto de dependencias con @nextui-org/react
- NextUI requiere framer-motion >=11.5.6"

# 4. Hacer push
Write-Host "Haciendo push..." -ForegroundColor Yellow
git push origin feat/ai-gamification-engine

Write-Host "¡Dependencias corregidas y push completado!" -ForegroundColor Green
