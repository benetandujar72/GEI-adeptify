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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto, req) {
        const currentUser = req.user;
        return this.usersService.create(createUserDto, currentUser);
    }
    async findAll(req, schoolId) {
        const currentUser = req.user;
        return this.usersService.findAll(schoolId || currentUser.schoolId, currentUser);
    }
    async findOne(id, req) {
        const currentUser = req.user;
        return this.usersService.findOne(id, currentUser);
    }
    async update(id, updateUserDto, req) {
        const currentUser = req.user;
        return this.usersService.update(id, updateUserDto, currentUser);
    }
    async remove(id, req) {
        const currentUser = req.user;
        return this.usersService.remove(id, currentUser);
    }
    async activateUser(id, req) {
        const currentUser = req.user;
        return this.usersService.activateUser(id, currentUser);
    }
    async deactivateUser(id, req) {
        const currentUser = req.user;
        return this.usersService.deactivateUser(id, currentUser);
    }
    async addPoints(id, body, req) {
        const currentUser = req.user;
        return this.usersService.addPoints(id, body.points, currentUser);
    }
    async addBadge(id, body, req) {
        const currentUser = req.user;
        return this.usersService.addBadge(id, body.badge, currentUser);
    }
    async addAchievement(id, body, req) {
        const currentUser = req.user;
        return this.usersService.addAchievement(id, body.achievement, currentUser);
    }
    async findByRole(role, schoolId, req) {
        const currentUser = req.user;
        return this.usersService.findByRole(role, schoolId || currentUser.schoolId);
    }
    async findByClass(classId, req) {
        const currentUser = req.user;
        return this.usersService.findByClass(classId, currentUser);
    }
    async findByFamily(familyId, req) {
        const currentUser = req.user;
        return this.usersService.findByFamily(familyId, currentUser);
    }
    async getMyProfile(req) {
        const currentUser = req.user;
        return this.usersService.findOne(currentUser.id, currentUser);
    }
    async updateMyProfile(updateUserDto, req) {
        const currentUser = req.user;
        return this.usersService.update(currentUser.id, updateUserDto, currentUser);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear nou usuari' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuari creat amb èxit' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No autoritzat' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir tots els usuaris de l\'escola' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Llista d\'usuaris obtinguda' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No autoritzat' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir usuari per ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuari obtingut' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuari no trobat' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No autoritzat' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualitzar usuari' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuari actualitzat' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuari no trobat' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No autoritzat' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar usuari' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuari eliminat' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuari no trobat' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No autoritzat' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/activate'),
    (0, swagger_1.ApiOperation)({ summary: 'Activar usuari' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuari activat' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuari no trobat' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No autoritzat' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "activateUser", null);
__decorate([
    (0, common_1.Post)(':id/deactivate'),
    (0, swagger_1.ApiOperation)({ summary: 'Desactivar usuari' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuari desactivat' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuari no trobat' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No autoritzat' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deactivateUser", null);
__decorate([
    (0, common_1.Post)(':id/points'),
    (0, swagger_1.ApiOperation)({ summary: 'Afegir punts a un usuari' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Punts afegits' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuari no trobat' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No autoritzat' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addPoints", null);
__decorate([
    (0, common_1.Post)(':id/badges'),
    (0, swagger_1.ApiOperation)({ summary: 'Afegir insígnia a un usuari' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Insígnia afegida' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuari no trobat' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No autoritzat' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addBadge", null);
__decorate([
    (0, common_1.Post)(':id/achievements'),
    (0, swagger_1.ApiOperation)({ summary: 'Afegir assoliment a un usuari' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Assoliment afegit' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuari no trobat' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No autoritzat' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addAchievement", null);
__decorate([
    (0, common_1.Get)('role/:role'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir usuaris per rol' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Llista d\'usuaris per rol' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No autoritzat' }),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, common_1.Query)('schoolId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findByRole", null);
__decorate([
    (0, common_1.Get)('class/:classId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir usuaris per classe' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Llista d\'usuaris de la classe' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No autoritzat' }),
    __param(0, (0, common_1.Param)('classId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findByClass", null);
__decorate([
    (0, common_1.Get)('family/:familyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir usuaris per família' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Llista d\'usuaris de la família' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No autoritzat' }),
    __param(0, (0, common_1.Param)('familyId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findByFamily", null);
__decorate([
    (0, common_1.Get)('profile/me'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir perfil de l\'usuari actual' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Perfil obtingut' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autoritzat' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Patch)('profile/me'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualitzar perfil de l\'usuari actual' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Perfil actualitzat' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autoritzat' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateMyProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Usuaris'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map