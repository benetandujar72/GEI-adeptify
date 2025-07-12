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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("../users/entities/user.entity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'role', 'status', 'firstName', 'lastName'],
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Credencials invàlides');
        }
        if (user.status !== user_entity_1.UserStatus.ACTIVE) {
            throw new common_1.UnauthorizedException('Compte no actiu');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            schoolId: user.schoolId,
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
        await this.userRepository.update(user.id, {
            lastLoginAt: new Date(),
        });
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                fullName: user.fullName,
            },
        };
    }
    async register(registerDto) {
        const { email, password, firstName, lastName, role, schoolId } = registerDto;
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('L\'email ja està registrat');
        }
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: role || user_entity_1.UserRole.STUDENT,
            schoolId: schoolId || 1,
            status: user_entity_1.UserStatus.PENDING,
            gamification: {
                points: 0,
                level: 1,
                badges: [],
                achievements: [],
            },
        });
        const savedUser = await this.userRepository.save(user);
        const payload = {
            sub: savedUser.id,
            email: savedUser.email,
            role: savedUser.role,
            schoolId: savedUser.schoolId,
        };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken,
            user: {
                id: savedUser.id,
                email: savedUser.email,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                role: savedUser.role,
                status: savedUser.status,
                fullName: savedUser.fullName,
            },
            message: 'Usuari registrat amb èxit. Pendent d\'activació per l\'administrador.',
        };
    }
    async googleLogin(profile) {
        const { emails, name, id } = profile;
        const email = emails[0].value;
        let user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            user = this.userRepository.create({
                email,
                googleId: id,
                firstName: name.givenName,
                lastName: name.familyName,
                role: user_entity_1.UserRole.STUDENT,
                status: user_entity_1.UserStatus.ACTIVE,
                schoolId: 1,
                gamification: {
                    points: 0,
                    level: 1,
                    badges: [],
                    achievements: [],
                },
            });
            user = await this.userRepository.save(user);
        }
        else {
            if (!user.googleId) {
                await this.userRepository.update(user.id, {
                    googleId: id,
                    lastLoginAt: new Date(),
                });
            }
        }
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            schoolId: user.schoolId,
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                fullName: user.fullName,
            },
        };
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.userRepository.findOne({
                where: { id: payload.sub },
            });
            if (!user || user.status !== user_entity_1.UserStatus.ACTIVE) {
                throw new common_1.UnauthorizedException('Token invàlid');
            }
            const newPayload = {
                sub: user.id,
                email: user.email,
                role: user.role,
                schoolId: user.schoolId,
            };
            const newAccessToken = this.jwtService.sign(newPayload);
            const newRefreshToken = this.jwtService.sign(newPayload, { expiresIn: '30d' });
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token de refresc invàlid');
        }
    }
    async validateToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token invàlid');
        }
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ['id', 'password'],
        });
        if (!user) {
            throw new common_1.BadRequestException('Usuari no trobat');
        }
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
            throw new common_1.BadRequestException('Contrasenya actual incorrecta');
        }
        const saltRounds = 12;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        await this.userRepository.update(userId, {
            password: hashedNewPassword,
        });
        return { message: 'Contrasenya actualitzada amb èxit' };
    }
    async forgotPassword(email) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            return { message: 'Si l\'email existeix, rebràs instruccions per recuperar la contrasenya' };
        }
        const resetToken = this.jwtService.sign({ sub: user.id, type: 'password-reset' }, { expiresIn: '1h' });
        return { message: 'Si l\'email existeix, rebràs instruccions per recuperar la contrasenya' };
    }
    async resetPassword(token, newPassword) {
        try {
            const payload = this.jwtService.verify(token);
            if (payload.type !== 'password-reset') {
                throw new common_1.BadRequestException('Token invàlid');
            }
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            await this.userRepository.update(payload.sub, {
                password: hashedPassword,
            });
            return { message: 'Contrasenya restablerta amb èxit' };
        }
        catch (error) {
            throw new common_1.BadRequestException('Token invàlid o expirat');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map