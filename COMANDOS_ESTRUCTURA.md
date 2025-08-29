# Comandos para Crear Estructura del Frontend

## 🚨 **Problema:**
Next.js no puede hacer build porque no encuentra el directorio `app` o `pages`.

## ✅ **Solución:**

### **Ejecuta estos comandos en orden:**

```bash
# 1. Agregar archivos al staging
git add frontend/app/layout.tsx
git add frontend/app/page.tsx
git add frontend/app/globals.css
git add frontend/public/.gitkeep
git add frontend/README.md
git add fix-dependencies.ps1
git add SOLUCION_DEPENDENCIAS.md
git add commit-estructura.ps1
git add COMANDOS_ESTRUCTURA.md

# 2. Hacer commit
git commit -m "feat: Agregar estructura básica del frontend con App Router

- Crear directorio app con layout.tsx y page.tsx
- Agregar globals.css con configuración de Tailwind
- Crear directorio public
- Agregar README.md con documentación
- Estructura mínima para que Next.js pueda hacer build"

# 3. Hacer push
git push origin feat/ai-gamification-engine
```

## 📋 **Archivos creados:**

### `frontend/app/layout.tsx`
```tsx
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
```

### `frontend/app/page.tsx`
```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">GEI Adeptify</h1>
      <p className="mt-4 text-xl">Plataforma educativa con IA</p>
    </main>
  )
}
```

### `frontend/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🎯 **Resultado esperado:**
- ✅ Next.js encuentra el directorio `app`
- ✅ Build exitoso en Render
- ✅ Frontend desplegado correctamente

## 🔍 **Verificación:**
Después del push, verifica en Render que:
1. El build comienza automáticamente
2. Next.js encuentra el directorio `app`
3. El build se completa exitosamente
4. El frontend está disponible en la URL de Render
