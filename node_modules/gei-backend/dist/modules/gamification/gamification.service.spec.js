"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const gamification_service_1 = require("./gamification.service");
const gamification_points_entity_1 = require("./entities/gamification-points.entity");
const user_entity_1 = require("../users/entities/user.entity");
describe('GamificationService', () => {
    let service;
    let gamificationPointsRepository;
    let userRepository;
    const mockGamificationPoints = {
        id: 1,
        userId: 1,
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
        const module = await testing_1.Test.createTestingModule({
            providers: [
                gamification_service_1.GamificationService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(gamification_points_entity_1.GamificationPoints),
                    useValue: {
                        findOne: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        createQueryBuilder: jest.fn(() => mockQueryBuilder),
                    },
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_entity_1.User),
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();
        service = module.get(gamification_service_1.GamificationService);
        gamificationPointsRepository = module.get((0, typeorm_1.getRepositoryToken)(gamification_points_entity_1.GamificationPoints));
        userRepository = module.get((0, typeorm_1.getRepositoryToken)(user_entity_1.User));
        service._mockQueryBuilder = mockQueryBuilder;
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getUserPoints', () => {
        it('should return existing user points', async () => {
            gamificationPointsRepository.findOne.mockResolvedValue(mockGamificationPoints);
            const result = await service.getUserPoints(1);
            expect(result).toEqual(mockGamificationPoints);
            expect(gamificationPointsRepository.findOne).toHaveBeenCalledWith({
                where: { userId: 1 }
            });
        });
        it('should create new points record if user has none', async () => {
            gamificationPointsRepository.findOne.mockResolvedValue(null);
            gamificationPointsRepository.create.mockReturnValue({
                userId: 1,
                points: 0,
                level: 1,
                xp: 0,
                badges: [],
                achievements: []
            });
            gamificationPointsRepository.save.mockResolvedValue({
                id: 1,
                userId: 1,
                points: 0,
                level: 1,
                xp: 0,
                badges: [],
                achievements: []
            });
            const result = await service.getUserPoints(1);
            expect(gamificationPointsRepository.create).toHaveBeenCalledWith({
                userId: 1,
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
            const result = await service.addPoints(1, 100, 'test_reason');
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
            const result = await service.addPoints(1, 100, 'test_reason');
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
            const result = await service.addBadge(1, 'new_badge');
            expect(result.badges).toContain('new_badge');
            expect(gamificationPointsRepository.save).toHaveBeenCalled();
        });
        it('should not add duplicate badge', async () => {
            const result = await service.addBadge(1, 'first_reservation');
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
            const result = await service.addAchievement(1, 'new_achievement');
            expect(result.achievements).toContain('new_achievement');
            expect(gamificationPointsRepository.save).toHaveBeenCalled();
        });
        it('should not add duplicate achievement', async () => {
            const result = await service.addAchievement(1, 'early_bird');
            expect(result.achievements).toEqual(mockGamificationPoints.achievements);
            expect(gamificationPointsRepository.save).not.toHaveBeenCalled();
        });
    });
    describe('getLeaderboard', () => {
        it('should return leaderboard for school', async () => {
            const mockLeaderboard = [
                { id: 1, userId: 1, points: 1000, level: 3, xp: 3000, badges: [], achievements: [], lastActivity: new Date() },
                { id: 2, userId: 2, points: 800, level: 2, xp: 2000, badges: [], achievements: [], lastActivity: new Date() },
                { id: 3, userId: 3, points: 600, level: 1, xp: 1000, badges: [], achievements: [], lastActivity: new Date() }
            ];
            service._mockQueryBuilder.getMany.mockResolvedValue(mockLeaderboard);
            const result = await service.getLeaderboard(1, 10);
            expect(result).toEqual(mockLeaderboard);
            const queryBuilder = service._mockQueryBuilder;
            expect(queryBuilder.leftJoin).toHaveBeenCalledWith('gp.user', 'user');
            expect(queryBuilder.where).toHaveBeenCalledWith('user.schoolId = :schoolId', { schoolId: 1 });
            expect(queryBuilder.orderBy).toHaveBeenCalledWith('gp.points', 'DESC');
            expect(queryBuilder.limit).toHaveBeenCalledWith(10);
        });
    });
});
//# sourceMappingURL=gamification.service.spec.js.map