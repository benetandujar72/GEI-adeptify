import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User, UserRole, UserStatus } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
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

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credencials invàlides');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Compte no actiu');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId || '1',
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    // Actualitzar últim login
    await this.userRepository.update(user.id, {
      lastLogin: new Date(),
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

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, role, schoolId } = registerDto;

    // Verificar si l'usuari ja existeix
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('L\'email ja està registrat');
    }

    // Encriptar contrasenya
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear nou usuari
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || UserRole.STUDENT,
      schoolId: schoolId ? schoolId.toString() : '1',
      status: UserStatus.PENDING, // Requereix activació per admin
      gamification: {
        points: 0,
        level: 1,
        badges: [],
        achievements: [],
      },
    });

    const savedUser = await this.userRepository.save(user);

    const payload: JwtPayload = {
      sub: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
      schoolId: savedUser.schoolId || '1',
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

  async googleLogin(profile: any) {
    const { emails, name, id } = profile;
    const email = emails[0].value;

    let user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      // Crear nou usuari amb Google
      user = this.userRepository.create({
        email,
        googleId: id,
        firstName: name.givenName,
        lastName: name.familyName,
        role: UserRole.STUDENT, // Rol per defecte
        status: UserStatus.ACTIVE,
        schoolId: '1', // ID per defecte
        gamification: {
          points: 0,
          level: 1,
          badges: [],
          achievements: [],
        },
      });

      user = await this.userRepository.save(user);
    } else {
      // Actualitzar Google ID si no existeix
      if (!user.googleId) {
        await this.userRepository.update(user.id, {
          googleId: id,
          lastLogin: new Date(),
        });
      }
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId || '1',
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

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException('Token invàlid');
      }

      const newPayload: JwtPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId || '1',
      };

      const newAccessToken = this.jwtService.sign(newPayload);
      const newRefreshToken = this.jwtService.sign(newPayload, { expiresIn: '30d' });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Token de refresc invàlid');
    }
  }

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token invàlid');
    }
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'password'],
    });

    if (!user) {
      throw new BadRequestException('Usuari no trobat');
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new BadRequestException('Contrasenya actual incorrecta');
    }

    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await this.userRepository.update(userId, {
      password: hashedNewPassword,
    });

    return { message: 'Contrasenya actualitzada amb èxit' };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      // No revelar si l'email existeix per seguretat
      return { message: 'Si l\'email existeix, rebràs instruccions per recuperar la contrasenya' };
    }

    // Generar token de recuperació
    const resetToken = this.jwtService.sign(
      { sub: user.id, type: 'password-reset' },
      { expiresIn: '1h' }
    );

    // Aquí s'enviaria l'email amb el token
    // await this.emailService.sendPasswordResetEmail(user.email, resetToken);

    return { message: 'Si l\'email existeix, rebràs instruccions per recuperar la contrasenya' };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token);

      if (payload.type !== 'password-reset') {
        throw new BadRequestException('Token invàlid');
      }

      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      await this.userRepository.update(payload.sub, {
        password: hashedPassword,
      });

      return { message: 'Contrasenya restablerta amb èxit' };
    } catch (error) {
      throw new BadRequestException('Token invàlid o expirat');
    }
  }
}