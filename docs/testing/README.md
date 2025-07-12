# 🧪 Testing - GEI Adeptify

Aquesta documentació explica com executar i mantenir els tests per a GEI Adeptify.

## 📋 Taula de Continguts

- [Estructura de Testing](#estructura-de-testing)
- [Executar Tests](#executar-tests)
- [Tests del Backend](#tests-del-backend)
- [Tests del Frontend](#tests-del-frontend)
- [Tests E2E](#tests-e2e)
- [Cobertura de Tests](#cobertura-de-tests)
- [Millors Pràctiques](#millors-pràctiques)
- [Troubleshooting](#troubleshooting)

## 🏗️ Estructura de Testing

```
GEI_adeptify/
├── backend/
│   ├── src/
│   │   └── modules/
│   │       ├── ai/
│   │       │   ├── ai.service.spec.ts          # Tests unitaris del servei AI
│   │       │   └── ai.controller.spec.ts       # Tests del controlador AI
│   │       ├── gamification/
│   │       │   └── gamification.service.spec.ts
│   │       └── ...
│   └── test/
│       ├── ai.e2e-spec.ts                      # Tests E2E del mòdul AI
│       └── app.e2e-spec.ts                     # Tests E2E generals
├── frontend/
│   ├── src/
│   │   └── components/
│   │       ├── ai/
│   │       │   └── AiChat.test.tsx             # Tests del component AI
│   │       ├── gamification/
│   │       │   └── GamificationCard.test.tsx
│   │       └── ...
│   ├── jest.config.js                          # Configuració de Jest
│   └── src/setupTests.ts                       # Setup per a tests
└── docs/
    └── testing/
        └── README.md                           # Aquesta documentació
```

## 🚀 Executar Tests

### Comandaments Principals

```bash
# Executar tots els tests
npm run test

# Tests del backend només
npm run test:backend

# Tests del frontend només
npm run test:frontend

# Tests amb mode watch
npm run test:backend:watch
npm run test:frontend:watch

# Tests E2E
npm run test:backend:e2e

# Cobertura de tests
npm run test:coverage
```

### Comandaments Detallats

```bash
# Backend - Tests unitaris
cd backend
npm run test

# Backend - Tests amb watch
npm run test:watch

# Backend - Tests E2E
npm run test:e2e

# Backend - Cobertura
npm run test:cov

# Frontend - Tests
cd frontend
npm run test

# Frontend - Tests amb watch
npm run test:watch

# Frontend - Cobertura
npm run test:coverage
```

## 🔧 Tests del Backend

### Tests Unitaris

Els tests unitaris del backend utilitzen **Jest** i **@nestjs/testing**.

#### Exemple: Test d'un Servei

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AiService } from './ai.service';

describe('AiService', () => {
  let service: AiService;
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process natural language request', async () => {
    const result = await service.processNaturalLanguageRequest('Hola', 1);
    expect(result).toContain('Bon dia');
  });
});
```

#### Tests de Controladors

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AI Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ai/chat (POST)', () => {
    return request(app.getHttpServer())
      .post('/ai/chat')
      .send({ message: 'Hola' })
      .expect(200);
  });
});
```

### Tests E2E

Els tests E2E simulen interaccions reals amb l'API:

```typescript
describe('AI Module (e2e)', () => {
  it('should process natural language request', async () => {
    const token = generateToken();
    
    return request(app.getHttpServer())
      .post('/ai/chat')
      .set('Authorization', `Bearer ${token}`)
      .send({
        message: 'Hola, com estàs?',
        messageId: 'test-123'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('response');
        expect(res.body).toHaveProperty('timestamp');
      });
  });
});
```

## ⚛️ Tests del Frontend

### Tests de Components

Els tests del frontend utilitzen **React Testing Library** i **Jest**.

#### Exemple: Test d'un Component

```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AiChat } from './AiChat';

describe('AiChat', () => {
  const mockOnSendMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders chat interface', () => {
    render(<AiChat onSendMessage={mockOnSendMessage} />);
    
    expect(screen.getByText('Assistent IA')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escriu el teu missatge...')).toBeInTheDocument();
  });

  it('sends message when send button is clicked', async () => {
    mockOnSendMessage.mockResolvedValue('Resposta de la IA');
    
    render(<AiChat onSendMessage={mockOnSendMessage} />);
    
    const input = screen.getByPlaceholderText('Escriu el teu missatge...');
    const sendButton = screen.getByTestId('send-icon').parentElement;
    
    fireEvent.change(input, { target: { value: 'Hola IA' } });
    fireEvent.click(sendButton!);
    
    await waitFor(() => {
      expect(mockOnSendMessage).toHaveBeenCalledWith('Hola IA');
    });
  });
});
```

### Configuració de Jest

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

## 🎯 Tests E2E

### Configuració

Els tests E2E utilitzen **Supertest** per a l'API i **Playwright** per a la interfície web.

### Exemple de Test E2E

```typescript
describe('Complete User Flow', () => {
  it('should allow user to chat with AI and make reservation', async () => {
    // 1. Login
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'user@example.com',
        password: 'password123'
      });
    
    const token = loginResponse.body.access_token;

    // 2. Chat with AI
    const chatResponse = await request(app.getHttpServer())
      .post('/ai/chat')
      .set('Authorization', `Bearer ${token}`)
      .send({
        message: 'Vull reservar la biblioteca',
        messageId: 'test-reservation'
      });

    expect(chatResponse.status).toBe(200);
    expect(chatResponse.body.response).toContain('reserva');

    // 3. Check reservation was created
    const reservationsResponse = await request(app.getHttpServer())
      .get('/reservations')
      .set('Authorization', `Bearer ${token}`);

    expect(reservationsResponse.status).toBe(200);
    expect(reservationsResponse.body).toHaveLength(1);
  });
});
```

## 📊 Cobertura de Tests

### Objectius de Cobertura

- **Backend**: 80% de cobertura mínima
- **Frontend**: 70% de cobertura mínima
- **Tests E2E**: Cobrir fluxos principals

### Generar Informes de Cobertura

```bash
# Backend
npm run test:coverage:backend

# Frontend
npm run test:coverage:frontend

# Tots
npm run test:coverage
```

### Interpretar Cobertura

- **Statements**: Percentatge de línies executades
- **Branches**: Percentatge de branques condicionals cobertes
- **Functions**: Percentatge de funcions cridades
- **Lines**: Percentatge de línies de codi executades

## ✅ Millors Pràctiques

### 1. Nomenclatura

```typescript
// ✅ Correcte
describe('AiService', () => {
  describe('processNaturalLanguageRequest', () => {
    it('should handle greeting messages', () => {
      // test
    });
  });
});

// ❌ Incorrecte
describe('AI', () => {
  it('test', () => {
    // test
  });
});
```

### 2. Organització

```typescript
describe('Component', () => {
  // Setup
  beforeEach(() => {
    // Preparació
  });

  // Tests positius
  describe('when valid input', () => {
    it('should work correctly', () => {
      // test
    });
  });

  // Tests negatius
  describe('when invalid input', () => {
    it('should handle errors', () => {
      // test
    });
  });

  // Cleanup
  afterEach(() => {
    // Neteja
  });
});
```

### 3. Mocks i Stubs

```typescript
// Mock de serveis externs
jest.mock('../services/ai.service', () => ({
  AiService: jest.fn().mockImplementation(() => ({
    processRequest: jest.fn().mockResolvedValue('Mocked response'),
  })),
}));

// Mock de props
const mockProps = {
  onSendMessage: jest.fn(),
  placeholder: 'Test placeholder',
};
```

### 4. Assertions

```typescript
// ✅ Específiques i descriptives
expect(result).toContain('expected text');
expect(mockFunction).toHaveBeenCalledWith('expected param');
expect(element).toBeInTheDocument();

// ❌ Genèriques
expect(result).toBeTruthy();
expect(mockFunction).toHaveBeenCalled();
```

## 🔧 Troubleshooting

### Problemes Comuns

#### 1. Tests que fallen intermitentment

```bash
# Executar tests múltiples vegades
npm run test -- --runInBand --verbose
```

#### 2. Problemes de timing en tests async

```typescript
// Utilitzar waitFor per a operacions async
await waitFor(() => {
  expect(screen.getByText('Result')).toBeInTheDocument();
});
```

#### 3. Problemes amb mocks

```typescript
// Netejar mocks entre tests
beforeEach(() => {
  jest.clearAllMocks();
});

// Mock de mòduls complets
jest.mock('lucide-react', () => ({
  Send: () => <div data-testid="send-icon">Send</div>,
}));
```

#### 4. Problemes de configuració

```bash
# Verificar configuració
npm run test -- --showConfig

# Executar tests amb debug
npm run test -- --verbose --detectOpenHandles
```

### Comandaments de Debug

```bash
# Debug de tests específics
npm run test -- --testNamePattern="should handle greeting"

# Debug amb Node.js inspector
node --inspect-brk node_modules/.bin/jest --runInBand

# Executar un sol fitxer de test
npm run test -- ai.service.spec.ts
```

## 📝 Manteniment

### Actualitzar Tests

1. **Quan s'afegeix nova funcionalitat**: Escriure tests abans o durant el desenvolupament
2. **Quan es modifica codi existent**: Actualitzar tests relacionats
3. **Quan es refactoritza**: Verificar que els tests encara són vàlids

### Revisió de Tests

- Revisar tests abans de fer merge
- Verificar cobertura de codi
- Assegurar que els tests són significatius i no només per cobertura

### Automatització

- Configurar CI/CD per executar tests automàticament
- Bloquejar merge si els tests fallen
- Generar informes de cobertura automàticament

---

Per a més informació sobre testing específic, consulta la documentació de:
- [Jest](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing) 