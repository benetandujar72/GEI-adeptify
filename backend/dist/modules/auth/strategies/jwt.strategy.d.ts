import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userRepository;
    constructor(configService: ConfigService, userRepository: Repository<User>);
    validate(payload: JwtPayload): Promise<any>;
}
export {};
