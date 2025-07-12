import { User } from '../../users/entities/user.entity';
export declare class GamificationPoints {
    id: number;
    userId: string;
    points: number;
    level: number;
    xp: number;
    badges: string[];
    achievements: string[];
    lastActivity: Date;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
