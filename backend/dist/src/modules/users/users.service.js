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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll(schoolId, currentUser) {
        if (!this.canViewUsers(currentUser)) {
            throw new common_1.ForbiddenException('No tens permisos per veure usuaris');
        }
        return this.userRepository.find({
            where: { schoolId },
            select: [
                'id',
                'firstName',
                'lastName',
                'email',
                'role',
                'status',
                'lastLoginAt',
                'createdAt',
                'schoolId',
                'classId',
                'familyId',
            ],
        });
    }
    async findOne(id, currentUser) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuari no trobat');
        }
        if (!this.canViewUser(currentUser, user)) {
            throw new common_1.ForbiddenException('No tens permisos per veure aquest usuari');
        }
        return user;
    }
    async findByEmail(email) {
        return this.userRepository.findOne({
            where: { email },
        });
    }
    async create(createUserDto, currentUser) {
        if (!this.canCreateUser(currentUser, createUserDto.role)) {
            throw new common_1.ForbiddenException('No tens permisos per crear aquest tipus d\'usuari');
        }
        const existingUser = await this.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new common_1.BadRequestException('L\'email ja està registrat');
        }
        const user = this.userRepository.create({
            ...createUserDto,
            schoolId: createUserDto.schoolId || '1',
            status: user_entity_1.UserStatus.PENDING,
            gamification: {
                points: 0,
                level: 1,
                badges: [],
                achievements: [],
            },
        });
        return this.userRepository.save(user);
    }
    async update(id, updateUserDto, currentUser) {
        const user = await this.findOne(id, currentUser);
        if (!this.canUpdateUser(currentUser, user)) {
            throw new common_1.ForbiddenException('No tens permisos per actualitzar aquest usuari');
        }
        if (updateUserDto.role && !this.canChangeRole(currentUser, user, updateUserDto.role)) {
            throw new common_1.ForbiddenException('No tens permisos per canviar el rol d\'aquest usuari');
        }
        const updateData = { ...updateUserDto };
        if (updateData.schoolId && typeof updateData.schoolId === 'number') {
            updateData.schoolId = updateData.schoolId.toString();
        }
        await this.userRepository.update(id, updateData);
        return this.findOne(id, currentUser);
    }
    async remove(id, currentUser) {
        const user = await this.findOne(id, currentUser);
        if (!this.canDeleteUser(currentUser, user)) {
            throw new common_1.ForbiddenException('No tens permisos per eliminar aquest usuari');
        }
        await this.userRepository.softDelete(id);
    }
    async activateUser(id, currentUser) {
        const user = await this.findOne(id, currentUser);
        if (!this.canActivateUser(currentUser, user)) {
            throw new common_1.ForbiddenException('No tens permisos per activar aquest usuari');
        }
        await this.userRepository.update(id, { status: user_entity_1.UserStatus.ACTIVE });
        return this.findOne(id, currentUser);
    }
    async deactivateUser(id, currentUser) {
        const user = await this.findOne(id, currentUser);
        if (!this.canDeactivateUser(currentUser, user)) {
            throw new common_1.ForbiddenException('No tens permisos per desactivar aquest usuari');
        }
        await this.userRepository.update(id, { status: user_entity_1.UserStatus.INACTIVE });
        return this.findOne(id, currentUser);
    }
    async updateGamification(id, gamificationData, currentUser) {
        const user = await this.findOne(id, currentUser);
        if (!this.canUpdateGamification(currentUser, user)) {
            throw new common_1.ForbiddenException('No tens permisos per actualitzar la gamificació');
        }
        const currentGamification = user.gamification || {
            points: 0,
            level: 1,
            badges: [],
            achievements: [],
        };
        const updatedGamification = {
            ...currentGamification,
            ...gamificationData,
        };
        await this.userRepository.update(id, {
            gamification: updatedGamification,
        });
        return this.findOne(id, currentUser);
    }
    async addPoints(id, points, currentUser) {
        const user = await this.findOne(id, currentUser);
        const currentPoints = user.gamification?.points || 0;
        const newPoints = currentPoints + points;
        const newLevel = Math.floor(newPoints / 100) + 1;
        return this.updateGamification(id, {
            points: newPoints,
            level: newLevel,
        }, currentUser);
    }
    async addBadge(id, badge, currentUser) {
        const user = await this.findOne(id, currentUser);
        const currentBadges = user.gamification?.badges || [];
        if (currentBadges.includes(badge)) {
            throw new common_1.BadRequestException('L\'usuari ja té aquesta insígnia');
        }
        const newBadges = [...currentBadges, badge];
        return this.updateGamification(id, { badges: newBadges }, currentUser);
    }
    async addAchievement(id, achievement, currentUser) {
        const user = await this.findOne(id, currentUser);
        const currentAchievements = user.gamification?.achievements || [];
        if (currentAchievements.includes(achievement)) {
            throw new common_1.BadRequestException('L\'usuari ja té aquest assoliment');
        }
        const newAchievements = [...currentAchievements, achievement];
        return this.updateGamification(id, { achievements: newAchievements }, currentUser);
    }
    async findByRole(role, schoolId) {
        return this.userRepository.find({
            where: { role, schoolId, status: user_entity_1.UserStatus.ACTIVE },
        });
    }
    async findByClass(classId, currentUser) {
        if (!this.canViewClass(currentUser, classId)) {
            throw new common_1.ForbiddenException('No tens permisos per veure aquesta classe');
        }
        return this.userRepository.find({
            where: { classId, status: user_entity_1.UserStatus.ACTIVE },
        });
    }
    async findByFamily(familyId, currentUser) {
        if (!this.canViewFamily(currentUser, familyId)) {
            throw new common_1.ForbiddenException('No tens permisos per veure aquesta família');
        }
        return this.userRepository.find({
            where: { familyId, status: user_entity_1.UserStatus.ACTIVE },
        });
    }
    canViewUsers(user) {
        return user.isAdmin || user.role === user_entity_1.UserRole.TEACHER;
    }
    canViewUser(currentUser, targetUser) {
        return (currentUser.isAdmin ||
            currentUser.id === targetUser.id ||
            (currentUser.role === user_entity_1.UserRole.TEACHER && targetUser.role === user_entity_1.UserRole.STUDENT));
    }
    canCreateUser(currentUser, newUserRole) {
        if (currentUser.role === user_entity_1.UserRole.SUPER_ADMIN)
            return true;
        if (currentUser.role === user_entity_1.UserRole.ADMIN && newUserRole !== user_entity_1.UserRole.SUPER_ADMIN)
            return true;
        return false;
    }
    canUpdateUser(currentUser, targetUser) {
        return (currentUser.isAdmin ||
            currentUser.id === targetUser.id ||
            (currentUser.role === user_entity_1.UserRole.TEACHER && targetUser.role === user_entity_1.UserRole.STUDENT));
    }
    canChangeRole(currentUser, targetUser, newRole) {
        if (currentUser.role === user_entity_1.UserRole.SUPER_ADMIN)
            return true;
        if (currentUser.role === user_entity_1.UserRole.ADMIN && newRole !== user_entity_1.UserRole.SUPER_ADMIN)
            return true;
        return false;
    }
    canDeleteUser(currentUser, targetUser) {
        return currentUser.isAdmin && currentUser.id !== targetUser.id;
    }
    canActivateUser(currentUser, targetUser) {
        return currentUser.isAdmin;
    }
    canDeactivateUser(currentUser, targetUser) {
        return currentUser.isAdmin && currentUser.id !== targetUser.id;
    }
    canUpdateGamification(currentUser, targetUser) {
        return (currentUser.isAdmin ||
            currentUser.id === targetUser.id ||
            currentUser.role === user_entity_1.UserRole.TEACHER);
    }
    canViewClass(currentUser, classId) {
        return (currentUser.isAdmin ||
            currentUser.role === user_entity_1.UserRole.TEACHER ||
            currentUser.classId === classId);
    }
    canViewFamily(currentUser, familyId) {
        return (currentUser.isAdmin ||
            currentUser.familyId === familyId);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map