# GEI Adeptify - Plataforma Educativa con IA

## 🚀 **Proyecto Completo**

GEI Adeptify es una plataforma educativa integral que combina inteligencia artificial, gamificación y herramientas de seguimiento académico para crear una experiencia de aprendizaje personalizada y efectiva.

## 📋 **Características Principales**

### **🤖 Asistente IA**
- Chat interactivo con Gemini AI
- Ayuda personalizada en estudios
- Generación de contenido educativo
- Traducción y explicaciones

### **📊 Progreso Académico**
- Seguimiento de calificaciones
- Estadísticas detalladas por materia
- Próximas evaluaciones
- Análisis de rendimiento

### **🎮 Gamificación**
- Sistema de logros y puntos
- Desafíos diarios
- Niveles de progreso
- Recompensas por actividades

### **💬 Comunicaciones**
- Mensajes entre estudiantes y profesores
- Notificaciones del sistema
- Sistema de alertas

### **❤️ Bienestar**
- Monitoreo de estado de ánimo
- Control de estrés
- Recomendaciones de salud

### **📚 Recursos**
- Biblioteca de materiales educativos
- Diferentes tipos de archivos
- Descarga de recursos

## 🏗️ **Arquitectura**

### **Backend (NestJS)**
```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/          # Autenticación JWT
│   │   ├── users/         # Gestión de usuarios
│   │   ├── academic/      # Progreso académico
│   │   ├── ai/           # Integración con Gemini AI
│   │   ├── analytics/    # Análisis de datos
│   │   ├── communications/ # Mensajería
│   │   ├── gamification/ # Sistema de logros
│   │   ├── health/       # Monitoreo de salud
│   │   ├── public/       # Endpoints públicos
│   │   ├── reservations/ # Reservas de recursos
│   │   ├── resources/    # Gestión de recursos
│   │   ├── schools/      # Gestión de escuelas
│   │   ├── tasks/        # Tareas y actividades
│   │   └── wellbeing/    # Bienestar estudiantil
│   ├── config/           # Configuraciones
│   └── main.ts           # Punto de entrada
```

### **Frontend (Next.js 14)**
```
frontend/
├── app/
│   ├── dashboard/        # Dashboard principal
│   │   ├── ai/          # Asistente IA
│   │   ├── progress/    # Progreso académico
│   │   ├── gamification/ # Gamificación
│   │   ├── communications/ # Comunicaciones
│   │   ├── wellness/    # Bienestar
│   │   └── resources/   # Recursos
│   ├── login/           # Página de login
│   ├── register/        # Página de registro
│   └── layout.tsx       # Layout principal
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── contexts/        # Context API
│   └── types/          # Tipos TypeScript
```

## 🛠️ **Tecnologías**

### **Backend**
- **NestJS** - Framework de Node.js
- **PostgreSQL** - Base de datos
- **TypeORM** - ORM
- **JWT** - Autenticación
- **Gemini AI** - Inteligencia artificial
- **Jest** - Testing
- **Docker** - Containerización

### **Frontend**
- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Context API** - Estado global
- **React Hooks** - Gestión de estado

## 🚀 **Despliegue**

### **Render (Recomendado)**
El proyecto está configurado para despliegue automático en Render con dos servicios:

1. **Backend**: `gei-backend`
2. **Frontend**: `gei-frontend`

### **Variables de Entorno**

#### **Backend**
```env
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=gei_adeptify
JWT_SECRET=your-jwt-secret
GEMINI_API_KEY=your-gemini-key
```

#### **Frontend**
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXT_PUBLIC_WS_URL=wss://your-backend-url.onrender.com
NEXT_PUBLIC_APP_NAME=GEI Adeptify
```

## 📦 **Instalación Local**

### **Prerrequisitos**
- Node.js 18+
- PostgreSQL
- Docker (opcional)

### **Backend**
```bash
cd backend
npm install
npm run build
npm run start:dev
```

### **Frontend**
```bash
cd frontend
npm install
npm run dev
```

### **Docker**
```bash
docker-compose up -d
```

## 🧪 **Testing**

### **Backend**
```bash
cd backend
npm run test
npm run test:e2e
```

### **Frontend**
```bash
cd frontend
npm run lint
```

## 📁 **Estructura del Proyecto**

```
GEI-adeptify/
├── backend/              # API REST con NestJS
├── frontend/             # Aplicación Next.js
├── docs/                 # Documentación
├── scripts/              # Scripts de utilidad
├── docker-compose.yml    # Configuración Docker
├── render.yaml           # Configuración Render
└── README.md            # Este archivo
```

## 🤝 **Contribución**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 **Contacto**

- **Proyecto**: [GEI Adeptify](https://github.com/benetandujar72/GEI-adeptify)
- **Email**: contacto@geiadeptify.com

---

**¡Gracias por usar GEI Adeptify! 🎓✨** 