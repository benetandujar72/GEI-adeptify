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
exports.GamificationController = void 0;
const common_1 = require("@nestjs/common");
const gamification_service_1 = require("./gamification.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let GamificationController = class GamificationController {
    constructor(gamificationService) {
        this.gamificationService = gamificationService;
    }
    async getUserPoints(req) {
        return await this.gamificationService.getUserPoints(req.user.id);
    }
    async getLeaderboard(req, body) {
        return await this.gamificationService.getLeaderboard(req.user.schoolId, body.limit);
    }
    async addPoints(req, body) {
        return await this.gamificationService.addPoints(req.user.id, body.points, body.reason);
    }
    async addBadge(req, body) {
        return await this.gamificationService.addBadge(req.user.id, body.badgeName);
    }
    async addAchievement(req, body) {
        return await this.gamificationService.addAchievement(req.user.id, body.achievementName);
    }
};
exports.GamificationController = GamificationController;
__decorate([
    (0, common_1.Get)('points'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getUserPoints", null);
__decorate([
    (0, common_1.Get)('leaderboard'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getLeaderboard", null);
__decorate([
    (0, common_1.Post)('points/add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "addPoints", null);
__decorate([
    (0, common_1.Post)('badges/add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "addBadge", null);
__decorate([
    (0, common_1.Post)('achievements/add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "addAchievement", null);
exports.GamificationController = GamificationController = __decorate([
    (0, common_1.Controller)('gamification'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [gamification_service_1.GamificationService])
], GamificationController);
//# sourceMappingURL=gamification.controller.js.map