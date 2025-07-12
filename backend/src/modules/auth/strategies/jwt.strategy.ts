import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserStatus } from '../../users/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { sub: userId, email } = payload;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('Usuari no trobat');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Compte no actiu');
    }

    if (user.email !== email) {
      throw new UnauthorizedException('Token invàlid');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
} 