import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserRole, UserStatus } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(schoolId: string, currentUser: User): Promise<User[]> {
    // Verificar permisos
    if (!this.canViewUsers(currentUser)) {
      throw new ForbiddenException('No tens permisos per veure usuaris');
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

  async findOne(id: string, currentUser: User): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuari no trobat');
    }

    // Verificar permisos
    if (!this.canViewUser(currentUser, user)) {
      throw new ForbiddenException('No tens permisos per veure aquest usuari');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto, currentUser: User): Promise<User> {
    // Verificar permisos
    if (!this.canCreateUser(currentUser, createUserDto.role)) {
      throw new ForbiddenException('No tens permisos per crear aquest tipus d\'usuari');
    }

    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('L\'email ja està registrat');
    }

    const user = this.userRepository.create({
      ...createUserDto,
      schoolId: createUserDto.schoolId ? createUserDto.schoolId.toString() : '1',
      status: UserStatus.PENDING,
      gamification: {
        points: 0,
        level: 1,
        badges: [],
        achievements: [],
      },
    });

    return this.userRepository.save(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    currentUser: User,
  ): Promise<User> {
    const user = await this.findOne(id, currentUser);

    // Verificar permisos
    if (!this.canUpdateUser(currentUser, user)) {
      throw new ForbiddenException('No tens permisos per actualitzar aquest usuari');
    }

    // Verificar canvis de rol
    if (updateUserDto.role && !this.canChangeRole(currentUser, user, updateUserDto.role)) {
      throw new ForbiddenException('No tens permisos per canviar el rol d\'aquest usuari');
    }

    // Asegurar que schoolId es string
    const updateData: any = { ...updateUserDto };
    if (updateData.schoolId && typeof updateData.schoolId === 'number') {
      updateData.schoolId = updateData.schoolId.toString();
    }

    await this.userRepository.update(id, updateData);
    return this.findOne(id, currentUser);
  }

  async remove(id: string, currentUser: User): Promise<void> {
    const user = await this.findOne(id, currentUser);

    // Verificar permisos
    if (!this.canDeleteUser(currentUser, user)) {
      throw new ForbiddenException('No tens permisos per eliminar aquest usuari');
    }

    await this.userRepository.softDelete(id);
  }

  async activateUser(id: string, currentUser: User): Promise<User> {
    const user = await this.findOne(id, currentUser);

    if (!this.canActivateUser(currentUser, user)) {
      throw new ForbiddenException('No tens permisos per activar aquest usuari');
    }

    await this.userRepository.update(id, { status: UserStatus.ACTIVE });
    return this.findOne(id, currentUser);
  }

  async deactivateUser(id: string, currentUser: User): Promise<User> {
    const user = await this.findOne(id, currentUser);

    if (!this.canDeactivateUser(currentUser, user)) {
      throw new ForbiddenException('No tens permisos per desactivar aquest usuari');
    }

    await this.userRepository.update(id, { status: UserStatus.INACTIVE });
    return this.findOne(id, currentUser);
  }

  async updateGamification(
    id: string,
    gamificationData: {
      points?: number;
      level?: number;
      badges?: string[];
      achievements?: string[];
    },
    currentUser: User,
  ): Promise<User> {
    const user = await this.findOne(id, currentUser);

    // Verificar permisos
    if (!this.canUpdateGamification(currentUser, user)) {
      throw new ForbiddenException('No tens permisos per actualitzar la gamificació');
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

  async addPoints(id: string, points: number, currentUser: User): Promise<User> {
    const user = await this.findOne(id, currentUser);
    const currentPoints = user.gamification?.points || 0;
    const newPoints = currentPoints + points;

    // Calcular nou nivell (exemple: cada 100 punts = 1 nivell)
    const newLevel = Math.floor(newPoints / 100) + 1;

    return this.updateGamification(
      id,
      {
        points: newPoints,
        level: newLevel,
      },
      currentUser,
    );
  }

  async addBadge(id: string, badge: string, currentUser: User): Promise<User> {
    const user = await this.findOne(id, currentUser);
    const currentBadges = user.gamification?.badges || [];

    if (currentBadges.includes(badge)) {
      throw new BadRequestException('L\'usuari ja té aquesta insígnia');
    }

    const newBadges = [...currentBadges, badge];

    return this.updateGamification(
      id,
      { badges: newBadges },
      currentUser,
    );
  }

  async addAchievement(id: string, achievement: string, currentUser: User): Promise<User> {
    const user = await this.findOne(id, currentUser);
    const currentAchievements = user.gamification?.achievements || [];

    if (currentAchievements.includes(achievement)) {
      throw new BadRequestException('L\'usuari ja té aquest assoliment');
    }

    const newAchievements = [...currentAchievements, achievement];

    return this.updateGamification(
      id,
      { achievements: newAchievements },
      currentUser,
    );
  }

  async findByRole(role: UserRole, schoolId: string): Promise<User[]> {
    return this.userRepository.find({
      where: { role, schoolId, status: UserStatus.ACTIVE },
    });
  }

  async findByClass(classId: string, currentUser: User): Promise<User[]> {
    // Verificar que l'usuari actual pot veure aquesta classe
    if (!this.canViewClass(currentUser, classId)) {
      throw new ForbiddenException('No tens permisos per veure aquesta classe');
    }

    return this.userRepository.find({
      where: { classId, status: UserStatus.ACTIVE },
    });
  }

  async findByFamily(familyId: string, currentUser: User): Promise<User[]> {
    // Verificar que l'usuari actual pot veure aquesta família
    if (!this.canViewFamily(currentUser, familyId)) {
      throw new ForbiddenException('No tens permisos per veure aquesta família');
    }

    return this.userRepository.find({
      where: { familyId, status: UserStatus.ACTIVE },
    });
  }

  // Mètodes de verificació de permisos
  private canViewUsers(user: User): boolean {
    return user.isAdmin || user.role === UserRole.TEACHER;
  }

  private canViewUser(currentUser: User, targetUser: User): boolean {
    return (
      currentUser.isAdmin ||
      currentUser.id === targetUser.id ||
      (currentUser.role === UserRole.TEACHER && targetUser.role === UserRole.STUDENT)
    );
  }

  private canCreateUser(currentUser: User, newUserRole: UserRole): boolean {
    if (currentUser.role === UserRole.SUPER_ADMIN) return true;
    if (currentUser.role === UserRole.ADMIN && newUserRole !== UserRole.SUPER_ADMIN) return true;
    return false;
  }

  private canUpdateUser(currentUser: User, targetUser: User): boolean {
    return (
      currentUser.isAdmin ||
      currentUser.id === targetUser.id ||
      (currentUser.role === UserRole.TEACHER && targetUser.role === UserRole.STUDENT)
    );
  }

  private canChangeRole(currentUser: User, targetUser: User, newRole: UserRole): boolean {
    if (currentUser.role === UserRole.SUPER_ADMIN) return true;
    if (currentUser.role === UserRole.ADMIN && newRole !== UserRole.SUPER_ADMIN) return true;
    return false;
  }

  private canDeleteUser(currentUser: User, targetUser: User): boolean {
    return currentUser.isAdmin && currentUser.id !== targetUser.id;
  }

  private canActivateUser(currentUser: User, targetUser: User): boolean {
    return currentUser.isAdmin;
  }

  private canDeactivateUser(currentUser: User, targetUser: User): boolean {
    return currentUser.isAdmin && currentUser.id !== targetUser.id;
  }

  private canUpdateGamification(currentUser: User, targetUser: User): boolean {
    return (
      currentUser.isAdmin ||
      currentUser.id === targetUser.id ||
      currentUser.role === UserRole.TEACHER
    );
  }

  private canViewClass(currentUser: User, classId: string): boolean {
    return (
      currentUser.isAdmin ||
      currentUser.role === UserRole.TEACHER ||
      currentUser.classId === classId
    );
  }

  private canViewFamily(currentUser: User, familyId: string): boolean {
    return (
      currentUser.isAdmin ||
      currentUser.familyId === familyId
    );
  }
}