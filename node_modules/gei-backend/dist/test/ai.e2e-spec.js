"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("../src/app.module");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
describe('AI Module (e2e)', () => {
    let app;
    let jwtService;
    const mockUser = {
        id: 1,
        firstName: 'Joan',
        lastName: 'Pérez',
        email: 'joan@example.com',
        role: 'teacher',
        schoolId: 1
    };
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [
                app_module_1.AppModule,
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
                    synchronize: true,
                }),
            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        jwtService = moduleFixture.get(jwt_1.JwtService);
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    const generateToken = () => {
        return jwtService.sign({
            sub: mockUser.id,
            email: mockUser.email,
            role: mockUser.role,
            schoolId: mockUser.schoolId
        });
    };
    describe('/ai/chat (POST)', () => {
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
                expect(res.body).toHaveProperty('messageId', 'test-123');
                expect(typeof res.body.response).toBe('string');
            });
        });
        it('should handle reservation requests', async () => {
            const token = generateToken();
            return request(app.getHttpServer())
                .post('/ai/chat')
                .set('Authorization', `Bearer ${token}`)
                .send({
                message: 'Vull reservar la biblioteca el dilluns a les 9:00',
                messageId: 'test-456'
            })
                .expect(200)
                .expect((res) => {
                expect(res.body.response).toContain('reserva');
            });
        });
        it('should handle availability queries', async () => {
            const token = generateToken();
            return request(app.getHttpServer())
                .post('/ai/chat')
                .set('Authorization', `Bearer ${token}`)
                .send({
                message: 'Està lliure la biblioteca?',
                messageId: 'test-789'
            })
                .expect(200)
                .expect((res) => {
                expect(res.body.response).toContain('disponibilitat');
            });
        });
        it('should require authentication', () => {
            return request(app.getHttpServer())
                .post('/ai/chat')
                .send({
                message: 'Hola',
                messageId: 'test-unauth'
            })
                .expect(401);
        });
        it('should validate request body', () => {
            const token = generateToken();
            return request(app.getHttpServer())
                .post('/ai/chat')
                .set('Authorization', `Bearer ${token}`)
                .send({
                messageId: 'test-invalid'
            })
                .expect(400);
        });
    });
    describe('/ai/translate (POST)', () => {
        it('should translate text to target language', async () => {
            const token = generateToken();
            return request(app.getHttpServer())
                .post('/ai/translate')
                .set('Authorization', `Bearer ${token}`)
                .send({
                text: 'Hello world',
                targetLanguage: 'ca'
            })
                .expect(200)
                .expect((res) => {
                expect(res.body).toHaveProperty('originalText', 'Hello world');
                expect(res.body).toHaveProperty('translatedText');
                expect(res.body).toHaveProperty('targetLanguage', 'ca');
                expect(res.body).toHaveProperty('timestamp');
                expect(typeof res.body.translatedText).toBe('string');
            });
        });
        it('should validate target language', () => {
            const token = generateToken();
            return request(app.getHttpServer())
                .post('/ai/translate')
                .set('Authorization', `Bearer ${token}`)
                .send({
                text: 'Hello world',
                targetLanguage: 'invalid'
            })
                .expect(400);
        });
        it('should require authentication', () => {
            return request(app.getHttpServer())
                .post('/ai/translate')
                .send({
                text: 'Hello world',
                targetLanguage: 'ca'
            })
                .expect(401);
        });
    });
    describe('/ai/capabilities (GET)', () => {
        it('should return AI capabilities', async () => {
            const token = generateToken();
            return request(app.getHttpServer())
                .get('/ai/capabilities')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .expect((res) => {
                expect(res.body).toHaveProperty('capabilities');
                expect(res.body).toHaveProperty('languages');
                expect(res.body).toHaveProperty('timestamp');
                expect(Array.isArray(res.body.capabilities)).toBe(true);
                expect(Array.isArray(res.body.languages)).toBe(true);
                const capabilityNames = res.body.capabilities.map((cap) => cap.name);
                expect(capabilityNames).toContain('reservations');
                expect(capabilityNames).toContain('availability');
                expect(capabilityNames).toContain('academic');
                expect(capabilityNames).toContain('general');
            });
        });
        it('should require authentication', () => {
            return request(app.getHttpServer())
                .get('/ai/capabilities')
                .expect(401);
        });
    });
    describe('Error handling', () => {
        it('should handle malformed requests gracefully', () => {
            const token = generateToken();
            return request(app.getHttpServer())
                .post('/ai/chat')
                .set('Authorization', `Bearer ${token}`)
                .send({
                message: '',
                messageId: 'test-empty'
            })
                .expect(400);
        });
        it('should handle invalid tokens', () => {
            return request(app.getHttpServer())
                .post('/ai/chat')
                .set('Authorization', 'Bearer invalid-token')
                .send({
                message: 'Hola',
                messageId: 'test-invalid-token'
            })
                .expect(401);
        });
    });
});
//# sourceMappingURL=ai.e2e-spec.js.map