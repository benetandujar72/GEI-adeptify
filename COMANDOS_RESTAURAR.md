# Comandos para Restaurar Archivos y Hacer Push

## 🚨 **Problema:**
Los archivos se eliminaron cuando hicimos `git rm -rf .`. Necesitamos restaurarlos y hacer push forzado.

## ✅ **Solución:**

### **Ejecuta estos comandos en orden:**

```bash
# 1. Crear .gitignore
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

# 3. Crear directorio frontend
if (-not (Test-Path "frontend")) {
    New-Item -ItemType Directory -Path "frontend" -Force
}

# 4. Crear frontend/package.json
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

# 5. Crear frontend/.npmrc
@"
production=false
registry=https://registry.npmjs.org/
engine-strict=true
"@ | Out-File -FilePath "frontend/.npmrc" -Encoding UTF8

# 6. Crear frontend/next.config.js
@"
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
"@ | Out-File -FilePath "frontend/next.config.js" -Encoding UTF8

# 7. Crear frontend/tsconfig.json
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

# 8. Crear frontend/postcss.config.js
@"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"@ | Out-File -FilePath "frontend/postcss.config.js" -Encoding UTF8

# 9. Crear frontend/tailwind.config.js
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
git add .gitignore
git add render.yaml
git add frontend/package.json
git add frontend/.npmrc
git add frontend/next.config.js
git add frontend/tsconfig.json
git add frontend/postcss.config.js
git add frontend/tailwind.config.js

# 11. Hacer commit
git commit -m "feat: Configuración completa para Render

- Configuración de Next.js con App Router
- Integración con Tailwind CSS y PostCSS
- Configuración de Render con rootDir: frontend
- Solución para error de autoprefixer
- Archivos de configuración necesarios"

# 12. Hacer push forzado
git push --force-with-lease origin feat/ai-gamification-engine
```

## 🎯 **Resultado esperado:**
- ✅ Archivos restaurados correctamente
- ✅ Push exitoso sin errores
- ✅ Render puede hacer build correctamente
- ✅ Configuración completa para el frontend

## 📋 **Archivos que se crearán:**
- ✅ `.gitignore` (excluir archivos innecesarios)
- ✅ `render.yaml` (configuración de Render)
- ✅ `frontend/package.json` (dependencias con autoprefixer en dependencies)
- ✅ `frontend/.npmrc` (configuración de npm)
- ✅ `frontend/next.config.js` (configuración de Next.js)
- ✅ `frontend/tsconfig.json` (configuración de TypeScript)
- ✅ `frontend/postcss.config.js` (configuración de PostCSS)
- ✅ `frontend/tailwind.config.js` (configuración de Tailwind)
