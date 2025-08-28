"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const ai_service_1 = require("./ai.service");
const user_entity_1 = require("../users/entities/user.entity");
const resource_entity_1 = require("../resources/entities/resource.entity");
const reservation_entity_1 = require("../reservations/entities/reservation.entity");
const academic_progress_entity_1 = require("../academic/entities/academic-progress.entity");
const message_entity_1 = require("../communications/entities/message.entity");
const notification_entity_1 = require("../communications/entities/notification.entity");
const gamification_points_entity_1 = require("../gamification/entities/gamification-points.entity");
describe('AiService', () => {
    let service;
    let userRepository;
    let resourceRepository;
    let reservationRepository;
    let academicProgressRepository;
    const mockUser = {
        id: '1',
        firstName: 'Joan',
        lastName: 'Pérez',
        email: 'joan@example.com',
        role: 'teacher',
        schoolId: 1
    };
    const mockResources = [
        {
            id: 1,
            name: 'Biblioteca',
            type: 'library',
            schoolId: 1
        },
        {
            id: 2,
            name: 'Sala d\'actes',
            type: 'auditorium',
            schoolId: 1
        }
    ];
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                ai_service_1.AiService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_entity_1.User),
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(resource_entity_1.Resource),
                    useValue: {
                        find: jest.fn(),
                    },
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(reservation_entity_1.Reservation),
                    useValue: {
                        find: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                    },
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(academic_progress_entity_1.AcademicProgress),
                    useValue: {
                        find: jest.fn(),
                    },
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(message_entity_1.Message),
                    useValue: {
                        find: jest.fn(),
                    },
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(notification_entity_1.Notification),
                    useValue: {
                        find: jest.fn(),
                    },
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(gamification_points_entity_1.GamificationPoints),
                    useValue: {
                        find: jest.fn(),
                    },
                },
            ],
        }).compile();
        service = module.get(ai_service_1.AiService);
        userRepository = module.get((0, typeorm_1.getRepositoryToken)(user_entity_1.User));
        resourceRepository = module.get((0, typeorm_1.getRepositoryToken)(resource_entity_1.Resource));
        reservationRepository = module.get((0, typeorm_1.getRepositoryToken)(reservation_entity_1.Reservation));
        academicProgressRepository = module.get((0, typeorm_1.getRepositoryToken)(academic_progress_entity_1.AcademicProgress));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('processNaturalLanguageRequest', () => {
        beforeEach(() => {
            userRepository.findOne.mockResolvedValue(mockUser);
            resourceRepository.find.mockResolvedValue(mockResources);
        });
        it('should handle greeting messages', async () => {
            const result = await service.processNaturalLanguageRequest('Hola', '1');
            expect(result).toContain('Joan');
            expect(result).toMatch(/(Bon dia|Bona tarda|Bona nit)/);
        });
        it('should handle reservation requests', async () => {
            reservationRepository.find.mockResolvedValue([]);
            reservationRepository.create.mockReturnValue({
                id: '1',
                resourceId: '1',
                userId: '1',
                title: 'Reserva de Biblioteca',
                startTime: expect.any(Date),
                endTime: expect.any(Date),
                status: 'pending'
            });
            reservationRepository.save.mockResolvedValue({
                id: '1',
                resourceId: '1',
                userId: '1',
                title: 'Reserva de Biblioteca',
                startTime: new Date(),
                endTime: new Date(),
                status: 'pending'
            });
            const result = await service.processNaturalLanguageRequest('Vull reservar la biblioteca el dilluns a les 9:00', '1');
            expect(result).toContain('Perfecte! He creat una reserva');
            expect(result).toContain('Biblioteca');
        });
        it('should handle availability queries', async () => {
            reservationRepository.find.mockResolvedValue([]);
            const result = await service.processNaturalLanguageRequest('Està lliure la biblioteca?', '1');
            expect(result).toContain('Sí, Biblioteca està lliure');
        });
        it('should handle academic queries for students', async () => {
            const studentUser = { ...mockUser, role: 'student' };
            userRepository.findOne.mockResolvedValue(studentUser);
            academicProgressRepository.find.mockResolvedValue([
                { id: 1, studentId: 1, subject: 'Matemàtiques', score: 85, maxScore: 100, date: new Date(), percentage: 85 }
            ]);
            const result = await service.processNaturalLanguageRequest('Com van les meves notes?', '1');
            expect(result).toContain('progrés acadèmic');
        });
        it('should handle help requests', async () => {
            const result = await service.processNaturalLanguageRequest('ajuda', '1');
            expect(result).toContain('Joan');
            expect(result).toContain('Reserves d\'espais');
        });
        it('should handle unknown user', async () => {
            userRepository.findOne.mockResolvedValue(null);
            const result = await service.processNaturalLanguageRequest('Hola', '999');
            expect(result).toContain('no he pogut trobar el teu perfil');
        });
    });
    describe('translateMessage', () => {
        it('should translate message to target language', async () => {
            const result = await service.translateMessage('Hello world', 'ca');
            expect(typeof result).toBe('string');
        });
        it('should return original message if translation fails', async () => {
            const originalMessage = 'Hello world';
            const result = await service.translateMessage(originalMessage, 'invalid-language');
            expect(result).toBe(originalMessage);
        });
    });
});
//# sourceMappingURL=ai.service.spec.js.map