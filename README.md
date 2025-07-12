# 🎓 GESTOR ESCOLAR INTEL·LIGENT (GEI)
## Ecosistema Educatiu Revolucionari Impulsat per IA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)

---

## 🚀 Visió del Projecte

**GEI** és un ecosistema educatiu intel·ligent que revoluciona la gestió escolar integrant reserves d'espais, comunicació família-escola, gestió acadèmica i administració en una plataforma única impulsada per IA, creant una experiència educativa del segle XXI.

### 🌟 Funcionalitats Principals

- **🎯 IA Conversacional Educativa** - Reserves amb llenguatge natural
- **📱 Hub de Comunicació Familiar** - Chat en temps real amb traducció
- **📊 Dashboard Acadèmic Intel·ligent** - Analytics predictius
- **🎮 Sistema de Gamificació** - Recompenses per a estudiants i famílies
- **📅 Calendari Educatiu Integrat** - Sincronització amb Google Calendar
- **🔔 Notificacions Intel·ligents** - Personalitzades per a cada rol
- **📈 Analytics Educatius Avançats** - Insights per a presa de decisions

---

## 🏗️ Arquitectura Tècnica

### Backend (NestJS + TypeScript)
- **Framework**: NestJS amb TypeScript
- **Base de Dades**: PostgreSQL + Redis + MongoDB
- **Autenticació**: JWT + Google OAuth 2.0
- **IA**: Google Gemini API
- **Comunicació**: Socket.io per a temps real
- **API**: GraphQL + RESTful endpoints

### Frontend (Next.js + TypeScript)
- **Framework**: Next.js 14 amb React 19
- **Estil**: Tailwind CSS + Framer Motion
- **Estat**: Zustand + React Query
- **UI Components**: Headless UI + Radix UI
- **Calendari**: FullCalendar
- **Gràfiques**: Chart.js + D3.js

### Infraestructura
- **Containers**: Docker + Docker Compose
- **Orquestració**: Kubernetes (producció)
- **Cloud**: Google Cloud Platform
- **Monitoratge**: Stackdriver + Prometheus

---

## 🚀 Inici Ràpid

### Prerequisits

- **Node.js** 18+ 
- **Docker** i **Docker Compose**
- **Git**

### Instal·lació

1. **Clonar el repositori**
```bash
git clone https://github.com/your-org/gei-adeptify.git
cd gei-adeptify
```

2. **Configurar variables d'entorn**
```bash
cp env.example .env
# Editar .env amb les teves configuracions
```

3. **Iniciar amb Docker**
```bash
# Desenvolupament
docker-compose up -d

# Producció
docker-compose -f docker-compose.prod.yml up -d
```

4. **Accedir a l'aplicació**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Adminer (DB)**: http://localhost:8080
- **Mailhog (Email)**: http://localhost:8025

### Desenvolupament Local

```bash
# Backend
cd backend
npm install
npm run start:dev

# Frontend
cd frontend
npm install
npm run dev
```

---

## 📁 Estructura del Projecte

```
GEI_adeptify/
├── backend/                    # API NestJS
│   ├── src/
│   │   ├── modules/           # Mòduls de l'aplicació
│   │   │   ├── auth/          # Autenticació
│   │   │   ├── users/         # Gestió d'usuaris
│   │   │   ├── resources/     # Recursos escolars
│   │   │   ├── reservations/  # Reserves amb IA
│   │   │   ├── communications/# Comunicació familiar
│   │   │   ├── academic/      # Gestió acadèmica
│   │   │   ├── analytics/     # Analytics educatius
│   │   │   └── gamification/  # Sistema de gamificació
│   │   ├── common/            # Utilitats comunes
│   │   └── config/            # Configuracions
│   └── Dockerfile
├── frontend/                   # Aplicació Next.js
│   ├── src/
│   │   ├── components/        # Components React
│   │   ├── pages/            # Pàgines Next.js
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # Serveis API
│   │   ├── stores/           # Estat global
│   │   └── utils/            # Utilitats
│   └── Dockerfile
├── docker-compose.yml         # Desenvolupament
├── docker-compose.prod.yml    # Producció
├── env.example               # Variables d'entorn
└── docs/                     # Documentació
```

---

## 🎯 Funcionalitats Detallades

### 1. IA Conversacional Educativa
- **Interpretació de llenguatge natural** per a reserves
- **Integració amb Google Gemini API**
- **Detecció automàtica de conflictes**
- **Suggeriments intel·ligents**

### 2. Hub de Comunicació Familiar
- **Chat en temps real** entre professors i famílies
- **Traducció automàtica** multilingüe
- **Notificacions personalitzades**
- **Historial de comunicacions**

### 3. Dashboard Acadèmic Intel·ligent
- **Visualització de progrés** amb gràfiques interactives
- **Prediccions IA** sobre rendiment acadèmic
- **Alertes preventives** per a problemes detectats
- **Suggeriments personalitzats**

### 4. Sistema de Gamificació
- **Punts i badges** per a assoliments
- **Classificacions saludables**
- **Recompenses per a participació**
- **Motivació educativa**

### 5. Calendari Educatiu Integrat
- **Vista unificada** de tots els esdeveniments
- **Sincronització** amb Google Calendar
- **Gestió de conflictes** automàtica
- **Recordatoris intel·ligents**

---

## 🔧 Configuració Avançada

### Variables d'Entorn

```bash
# Copiar l'exemple
cp env.example .env

# Configurar les variables necessàries
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/gei_db
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your-google-client-id
GEMINI_API_KEY=your-gemini-api-key
```

### Base de Dades

```bash
# Executar migracions
cd backend
npm run migration:run

# Poblar amb dades d'exemple
npm run seed
```

### Desplegament

```bash
# Desplegament de producció
docker-compose -f docker-compose.prod.yml up -d

# Amb Kubernetes
kubectl apply -f k8s/
```

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test
npm run test:e2e

# Frontend tests
cd frontend
npm run test
npm run test:coverage
```

---

## 📊 Mètriques de Qualitat

### Tècniques
- **Rendiment**: < 2s temps de càrrega, < 100ms resposta API
- **Disponibilitat**: 99.9% uptime
- **Seguretat**: Zero vulnerabilitats crítiques
- **Escalabilitat**: Suport per a 10,000+ usuaris concurrents

### Educatives
- **Engagement**: 80% usuaris actius diaris
- **Comunicació**: 90% taxa de comunicació família-professor
- **Millora acadèmica**: 15% millora en rendiment estudiantil
- **Optimització de recursos**: 95% utilització eficient

---

## 🤝 Contribució

1. **Fork** el projecte
2. **Crea** una branca per a la teva feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** els teus canvis (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la branca (`git push origin feature/AmazingFeature`)
5. **Obre** un Pull Request

### Guia d'Estil

- **TypeScript**: Airbnb Style Guide
- **React**: React Best Practices + Hooks
- **NestJS**: NestJS Style Guide
- **Git**: Conventional Commits

---

## 📄 Llicència

Aquest projecte està llicenciat sota la Llicència MIT - veure el fitxer [LICENSE](LICENSE) per a més detalls.

---

## 🆘 Suport

- **Documentació**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-org/gei-adeptify/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/gei-adeptify/discussions)
- **Email**: support@gei.edu

---

## 🙏 Agraïments

- **Google Gemini API** per a les capacitats d'IA
- **NestJS** per a l'arquitectura del backend
- **Next.js** per a l'experiència de desenvolupament
- **Tailwind CSS** per al disseny modern
- **Comunitat educativa** per a la inspiració

---

## 🚀 **ESTAT ACTUAL DEL PROJECTE**

### ✅ **Completat**
- ✅ Estructura de directoris backend/frontend
- ✅ Package.json configurats (NestJS + Next.js)
- ✅ Docker Compose (dev + prod)
- ✅ Dockerfiles optimitzats
- ✅ Configuració d'entorn (.env.example)
- ✅ Configuració de base de dades (TypeORM)
- ✅ Entitats principals (User, Resource, Reservation)
- ✅ README detallat amb instruccions
- ✅ **Sistema d'autenticació complet** (JWT + Google OAuth)
- ✅ **Gestió d'usuaris i permisos** amb gamificació
- ✅ **Frontend Next.js** amb Tailwind CSS
- ✅ **Landing page atractiva** i responsive
- ✅ **Configuració TypeScript** per backend i frontend
- ✅ **Estils globals** amb components personalitzats

### 🔄 **En Progrés**
- 🔄 Instal·lació de dependències
- 🔄 Configuració de serveis Docker
- 🔄 Testing i validació

### 📋 **Pròximes Tasques AI**
- 📋 **AI Task 5**: Sistema de reserves intel·ligent amb IA
- 📋 **AI Task 6**: Hub de comunicació familiar bidireccional
- 📋 **AI Task 7**: Mòdul acadèmic avançat amb avaluacions
- 📋 **AI Task 8**: Analytics i reporting predictiu
- 📋 **AI Task 9**: Gamificació educativa completa
- 📋 **AI Task 10**: Integracions externes (Google, Microsoft, etc.)

---

**🎓 Transformem l'educació junts! 🚀** 