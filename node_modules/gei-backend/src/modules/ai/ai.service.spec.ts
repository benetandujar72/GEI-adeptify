import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AiService } from './ai.service';
import { User } from '../users/entities/user.entity';
import { Resource } from '../resources/entities/resource.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { AcademicProgress } from '../academic/entities/academic-progress.entity';
import { Message } from '../communications/entities/message.entity';
import { Notification } from '../communications/entities/notification.entity';
import { GamificationPoints } from '../gamification/entities/gamification-points.entity';

describe('AiService', () => {
  let service: AiService;
  let userRepository: any;
  let resourceRepository: any;
  let reservationRepository: any;
  let academicProgressRepository: any;

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Resource),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Reservation),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(AcademicProgress),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Message),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Notification),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(GamificationPoints),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    userRepository = module.get(getRepositoryToken(User));
    resourceRepository = module.get(getRepositoryToken(Resource));
    reservationRepository = module.get(getRepositoryToken(Reservation));
    academicProgressRepository = module.get(getRepositoryToken(AcademicProgress));
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

      const result = await service.processNaturalLanguageRequest(
        'Vull reservar la biblioteca el dilluns a les 9:00',
        '1'
      );

      expect(result).toContain('Perfecte! He creat una reserva');
      expect(result).toContain('Biblioteca');
    });

    it('should handle availability queries', async () => {
      reservationRepository.find.mockResolvedValue([]);

      const result = await service.processNaturalLanguageRequest(
        'Està lliure la biblioteca?',
        '1'
      );

      expect(result).toContain('Sí, Biblioteca està lliure');
    });

    it('should handle academic queries for students', async () => {
      const studentUser = { ...mockUser, role: 'student' };
      userRepository.findOne.mockResolvedValue(studentUser);
      academicProgressRepository.find.mockResolvedValue([
        { id: 1, studentId: 1, subject: 'Matemàtiques', score: 85, maxScore: 100, date: new Date(), percentage: 85 }
      ]);

      const result = await service.processNaturalLanguageRequest(
        'Com van les meves notes?',
        '1'
      );

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