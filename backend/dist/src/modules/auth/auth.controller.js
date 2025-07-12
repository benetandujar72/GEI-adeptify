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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async googleAuth() {
    }
    async googleAuthRedirect(req) {
        return this.authService.googleLogin(req.user);
    }
    async refreshToken(body) {
        if (!body.refreshToken) {
            throw new common_1.BadRequestException('Token de refresc requerit');
        }
        return this.authService.refreshToken(body.refreshToken);
    }
    async changePassword(req, body) {
        const user = req.user;
        return this.authService.changePassword(user.sub, body.oldPassword, body.newPassword);
    }
    async forgotPassword(body) {
        if (!body.email) {
            throw new common_1.BadRequestException('Email requerit');
        }
        return this.authService.forgotPassword(body.email);
    }
    async resetPassword(body) {
        if (!body.token || !body.newPassword) {
            throw new common_1.BadRequestException('Token i nova contrasenya requerits');
        }
        return this.authService.resetPassword(body.token, body.newPassword);
    }
    async getProfile(req) {
        const user = req.user;
        return {
            id: user.sub,
            email: user.email,
            role: user.role,
            schoolId: user.schoolId,
        };
    }
    async logout() {
        return { message: 'Sessió tancada amb èxit' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Iniciar sessió amb email i contrasenya' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login exitós' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credencials invàlides' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar nou usuari' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuari registrat amb èxit' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email ja registrat' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, swagger_1.ApiOperation)({ summary: 'Iniciar autenticació amb Google' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, swagger_1.ApiOperation)({ summary: 'Callback de Google OAuth' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Autenticació amb Google exitosa' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Refrescar token d\'accés' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token refrescat amb èxit' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token de refresc invàlid' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Canviar contrasenya' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contrasenya canviada amb èxit' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Contrasenya actual incorrecta' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Solicitar recuperació de contrasenya' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email de recuperació enviat' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Restablir contrasenya amb token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contrasenya restablerta amb èxit' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Token invàlid o expirat' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir perfil de l\'usuari actual' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Perfil obtingut amb èxit' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autoritzat' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Tancar sessió' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sessió tancada amb èxit' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Autenticació'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map