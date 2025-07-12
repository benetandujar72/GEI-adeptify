import { Repository } from 'typeorm';
import { GamificationPoints } from './entities/gamification-points.entity';
import { User } from '../users/entities/user.entity';
export declare class GamificationService {
    private gamificationPointsRepository;
    private userRepository;
    constructor(gamificationPointsRepository: Repository<GamificationPoints>, userRepository: Repository<User>);
    getUserPoints(userId: number): Promise<GamificationPoints>;
    addPoints(userId: number, pointsToAdd: number, reason: string): Promise<GamificationPoints>;
    addBadge(userId: number, badgeName: string): Promise<GamificationPoints>;
    addAchievement(userId: number, achievementName: string): Promise<GamificationPoints>;
    getLeaderboard(schoolId: number, limit?: number): Promise<GamificationPoints[]>;
}
