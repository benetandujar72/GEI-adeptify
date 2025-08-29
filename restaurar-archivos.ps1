Write-Host "Restaurando archivos necesarios..." -ForegroundColor Green

# 1. Crear .gitignore
Write-Host "Creando .gitignore..." -ForegroundColor Yellow
@"
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Next.js
.next/
out/
build/
dist/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
Thumbs.db
.DS_Store

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8

# 2. Crear render.yaml
Write-Host "Creando render.yaml..." -ForegroundColor Yellow
@"
services:
  - type: web
    name: gei-frontend
    runtime: node
    rootDir: frontend
    buildCommand: npm ci --include=dev && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: NEXT_PUBLIC_API_URL
        sync: false
      - key: NEXT_PUBLIC_WS_URL
        sync: false
      - key: NEXT_PUBLIC_APP_NAME
        value: "GEI Adeptify"
    healthCheckPath: /
    autoDeploy: true
"@ | Out-File -FilePath "render.yaml" -Encoding UTF8

# 3. Crear directorio frontend si no existe
if (-not (Test-Path "frontend")) {
    New-Item -ItemType Directory -Path "frontend" -Force
    Write-Host "✅ Directorio frontend creado" -ForegroundColor Green
}

# 4. Crear package.json del frontend
Write-Host "Creando frontend/package.json..." -ForegroundColor Yellow
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
    "framer-motion": "^10.16.4",
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

# 5. Crear .npmrc
Write-Host "Creando frontend/.npmrc..." -ForegroundColor Yellow
@"
production=false
registry=https://registry.npmjs.org/
engine-strict=true
"@ | Out-File -FilePath "frontend/.npmrc" -Encoding UTF8

# 6. Crear next.config.js
Write-Host "Creando frontend/next.config.js..." -ForegroundColor Yellow
@"
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
"@ | Out-File -FilePath "frontend/next.config.js" -Encoding UTF8

# 7. Crear tsconfig.json
Write-Host "Creando frontend/tsconfig.json..." -ForegroundColor Yellow
@"
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
"@ | Out-File -FilePath "frontend/tsconfig.json" -Encoding UTF8

# 8. Crear postcss.config.js
Write-Host "Creando frontend/postcss.config.js..." -ForegroundColor Yellow
@"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"@ | Out-File -FilePath "frontend/postcss.config.js" -Encoding UTF8

# 9. Crear tailwind.config.js
Write-Host "Creando frontend/tailwind.config.js..." -ForegroundColor Yellow
@"
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
"@ | Out-File -FilePath "frontend/tailwind.config.js" -Encoding UTF8

# 10. Agregar archivos al staging
Write-Host "Agregando archivos al staging..." -ForegroundColor Yellow
git add .gitignore
git add render.yaml
git add frontend/package.json
git add frontend/.npmrc
git add frontend/next.config.js
git add frontend/tsconfig.json
git add frontend/postcss.config.js
git add frontend/tailwind.config.js

# 11. Hacer commit
Write-Host "Haciendo commit..." -ForegroundColor Yellow
git commit -m "feat: Configuración completa para Render

- Configuración de Next.js con App Router
- Integración con Tailwind CSS y PostCSS
- Configuración de Render con rootDir: frontend
- Solución para error de autoprefixer
- Archivos de configuración necesarios"

# 12. Hacer push forzado
Write-Host "Haciendo push forzado..." -ForegroundColor Yellow
git push --force-with-lease origin feat/ai-gamification-engine

Write-Host "¡Archivos restaurados y push completado!" -ForegroundColor Green
