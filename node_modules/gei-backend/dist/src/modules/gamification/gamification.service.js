"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const gamification_points_entity_1 = require("./entities/gamification-points.entity");
const user_entity_1 = require("../users/entities/user.entity");
let GamificationService = class GamificationService {
    constructor(gamificationPointsRepository, userRepository) {
        this.gamificationPointsRepository = gamificationPointsRepository;
        this.userRepository = userRepository;
    }
    async getUserPoints(userId) {
        let points = await this.gamificationPointsRepository.findOne({
            where: { userId }
        });
        if (!points) {
            points = this.gamificationPointsRepository.create({
                userId,
                points: 0,
                level: 1,
                xp: 0,
                badges: [],
                achievements: []
            });
            await this.gamificationPointsRepository.save(points);
        }
        return points;
    }
    async addPoints(userId, pointsToAdd, reason) {
        const points = await this.getUserPoints(userId);
        points.points += pointsToAdd;
        points.xp += pointsToAdd;
        points.lastActivity = new Date();
        const newLevel = Math.floor(points.xp / 1000) + 1;
        if (newLevel > points.level) {
            points.level = newLevel;
            if (!points.badges.includes(`level_${newLevel}`)) {
                points.badges.push(`level_${newLevel}`);
            }
        }
        return await this.gamificationPointsRepository.save(points);
    }
    async addBadge(userId, badgeName) {
        const points = await this.getUserPoints(userId);
        if (!points.badges.includes(badgeName)) {
            points.badges.push(badgeName);
            return await this.gamificationPointsRepository.save(points);
        }
        return points;
    }
    async addAchievement(userId, achievementName) {
        const points = await this.getUserPoints(userId);
        if (!points.achievements.includes(achievementName)) {
            points.achievements.push(achievementName);
            return await this.gamificationPointsRepository.save(points);
        }
        return points;
    }
    async getLeaderboard(schoolId, limit = 10) {
        return await this.gamificationPointsRepository
            .createQueryBuilder('gp')
            .leftJoin('gp.user', 'user')
            .where('user.schoolId = :schoolId', { schoolId })
            .orderBy('gp.points', 'DESC')
            .limit(limit)
            .getMany();
    }
};
exports.GamificationService = GamificationService;
exports.GamificationService = GamificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(gamification_points_entity_1.GamificationPoints)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GamificationService);
//# sourceMappingURL=gamification.service.js.map