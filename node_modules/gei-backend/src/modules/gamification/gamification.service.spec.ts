import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GamificationService } from './gamification.service';
import { GamificationPoints } from './entities/gamification-points.entity';
import { User } from '../users/entities/user.entity';

describe('GamificationService', () => {
  let service: GamificationService;
  let gamificationPointsRepository: any;
  let userRepository: any;

  const mockGamificationPoints = {
    id: 1,
    userId: '1',
    points: 500,
    level: 2,
    xp: 1500,
    badges: ['first_reservation', 'level_2'],
    achievements: ['early_bird'],
    lastActivity: new Date()
  };

  beforeEach(async () => {
    const mockQueryBuilder = {
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamificationService,
        {
          provide: getRepositoryToken(GamificationPoints),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn(() => mockQueryBuilder),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GamificationService>(GamificationService);
    gamificationPointsRepository = module.get(getRepositoryToken(GamificationPoints));
    userRepository = module.get(getRepositoryToken(User));
    // expose mockQueryBuilder for use in tests
    (service as any)._mockQueryBuilder = mockQueryBuilder;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserPoints', () => {
    it('should return existing user points', async () => {
      gamificationPointsRepository.findOne.mockResolvedValue(mockGamificationPoints);

      const result = await service.getUserPoints('1');

      expect(result).toEqual(mockGamificationPoints);
      expect(gamificationPointsRepository.findOne).toHaveBeenCalledWith({
        where: { userId: '1' }
      });
    });

    it('should create new points record if user has none', async () => {
      gamificationPointsRepository.findOne.mockResolvedValue(null);
      gamificationPointsRepository.create.mockReturnValue({
        userId: '1',
        points: 0,
        level: 1,
        xp: 0,
        badges: [],
        achievements: []
      });
      gamificationPointsRepository.save.mockResolvedValue({
        id: 1,
        userId: '1',
        points: 0,
        level: 1,
        xp: 0,
        badges: [],
        achievements: []
      });

      const result = await service.getUserPoints('1');

      expect(gamificationPointsRepository.create).toHaveBeenCalledWith({
        userId: '1',
        points: 0,
        level: 1,
        xp: 0,
        badges: [],
        achievements: []
      });
      expect(gamificationPointsRepository.save).toHaveBeenCalled();
    });
  });

  describe('addPoints', () => {
    beforeEach(() => {
      gamificationPointsRepository.findOne.mockResolvedValue(mockGamificationPoints);
    });

    it('should add points and update level', async () => {
      const updatedPoints = {
        ...mockGamificationPoints,
        points: 600,
        xp: 1600,
        level: 3,
        lastActivity: expect.any(Date)
      };
      gamificationPointsRepository.save.mockResolvedValue(updatedPoints);

      const result = await service.addPoints('1', 100, 'test_reason');

      expect(result.points).toBe(600);
      expect(result.xp).toBe(1600);
      expect(result.level).toBe(3);
      expect(gamificationPointsRepository.save).toHaveBeenCalled();
    });

    it('should add level up badge when level increases', async () => {
      const highLevelPoints = {
        ...mockGamificationPoints,
        xp: 2500,
        level: 2
      };
      gamificationPointsRepository.findOne.mockResolvedValue(highLevelPoints);

      const updatedPoints = {
        ...highLevelPoints,
        points: 600,
        xp: 2600,
        level: 3,
        badges: ['first_reservation', 'level_2', 'level_3'],
        lastActivity: expect.any(Date)
      };
      gamificationPointsRepository.save.mockResolvedValue(updatedPoints);

      const result = await service.addPoints('1', 100, 'test_reason');

      expect(result.badges).toContain('level_3');
    });
  });

  describe('addBadge', () => {
    beforeEach(() => {
      gamificationPointsRepository.findOne.mockResolvedValue(mockGamificationPoints);
    });

    it('should add new badge', async () => {
      const updatedPoints = {
        ...mockGamificationPoints,
        badges: ['first_reservation', 'level_2', 'new_badge']
      };
      gamificationPointsRepository.save.mockResolvedValue(updatedPoints);

      const result = await service.addBadge('1', 'new_badge');

      expect(result.badges).toContain('new_badge');
      expect(gamificationPointsRepository.save).toHaveBeenCalled();
    });

    it('should not add duplicate badge', async () => {
      const result = await service.addBadge('1', 'first_reservation');

      expect(result.badges).toEqual(mockGamificationPoints.badges);
      expect(gamificationPointsRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('addAchievement', () => {
    beforeEach(() => {
      gamificationPointsRepository.findOne.mockResolvedValue(mockGamificationPoints);
    });

    it('should add new achievement', async () => {
      const updatedPoints = {
        ...mockGamificationPoints,
        achievements: ['early_bird', 'new_achievement']
      };
      gamificationPointsRepository.save.mockResolvedValue(updatedPoints);

      const result = await service.addAchievement('1', 'new_achievement');

      expect(result.achievements).toContain('new_achievement');
      expect(gamificationPointsRepository.save).toHaveBeenCalled();
    });

    it('should not add duplicate achievement', async () => {
      const result = await service.addAchievement('1', 'early_bird');

      expect(result.achievements).toEqual(mockGamificationPoints.achievements);
      expect(gamificationPointsRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('getLeaderboard', () => {
    it('should return leaderboard for school', async () => {
      const mockLeaderboard = [
        { id: 1, userId: '1', points: 1000, level: 3, xp: 3000, badges: [], achievements: [], lastActivity: new Date() },
        { id: 2, userId: '2', points: 800, level: 2, xp: 2000, badges: [], achievements: [], lastActivity: new Date() },
        { id: 3, userId: '3', points: 600, level: 1, xp: 1000, badges: [], achievements: [], lastActivity: new Date() }
      ];
      // assign mockLeaderboard to the mockQueryBuilder
      (service as any)._mockQueryBuilder.getMany.mockResolvedValue(mockLeaderboard);

      const result = await service.getLeaderboard('1', 10);

      expect(result).toEqual(mockLeaderboard);
      const queryBuilder = (service as any)._mockQueryBuilder;
      expect(queryBuilder.leftJoin).toHaveBeenCalledWith('gp.user', 'user');
      expect(queryBuilder.where).toHaveBeenCalledWith('user.schoolId = :schoolId', { schoolId: '1' });
      expect(queryBuilder.orderBy).toHaveBeenCalledWith('gp.points', 'DESC');
      expect(queryBuilder.limit).toHaveBeenCalledWith(10);
    });
  });
});