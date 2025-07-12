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
exports.AcademicController = void 0;
const common_1 = require("@nestjs/common");
const academic_service_1 = require("./academic.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AcademicController = class AcademicController {
    constructor(academicService) {
        this.academicService = academicService;
    }
    async createProgress(req, body) {
        return await this.academicService.createProgress(body);
    }
    async getStudentProgress(studentId, body) {
        return await this.academicService.getStudentProgress(+studentId, body.subject);
    }
    async getStudentAverage(studentId, body) {
        return await this.academicService.getStudentAverage(+studentId, body.subject);
    }
    async getSubjectProgress(studentId, subject) {
        return await this.academicService.getSubjectProgress(+studentId, subject);
    }
    async updateProgress(id, updateData) {
        return await this.academicService.updateProgress(+id, updateData);
    }
    async deleteProgress(id) {
        return await this.academicService.deleteProgress(+id);
    }
    async getMyProgress(req, body) {
        return await this.academicService.getStudentProgress(req.user.id, body.subject);
    }
    async getMyAverage(req, body) {
        return await this.academicService.getStudentAverage(req.user.id, body.subject);
    }
};
exports.AcademicController = AcademicController;
__decorate([
    (0, common_1.Post)('progress'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AcademicController.prototype, "createProgress", null);
__decorate([
    (0, common_1.Get)('progress/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicController.prototype, "getStudentProgress", null);
__decorate([
    (0, common_1.Get)('progress/:studentId/average'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicController.prototype, "getStudentAverage", null);
__decorate([
    (0, common_1.Get)('progress/:studentId/subject/:subject'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Param)('subject')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AcademicController.prototype, "getSubjectProgress", null);
__decorate([
    (0, common_1.Patch)('progress/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Delete)('progress/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicController.prototype, "deleteProgress", null);
__decorate([
    (0, common_1.Get)('my-progress'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AcademicController.prototype, "getMyProgress", null);
__decorate([
    (0, common_1.Get)('my-average'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AcademicController.prototype, "getMyAverage", null);
exports.AcademicController = AcademicController = __decorate([
    (0, common_1.Controller)('academic'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [academic_service_1.AcademicService])
], AcademicController);
//# sourceMappingURL=academic.controller.js.map