import { Repository } from 'typeorm';
import { GamificationPoints } from './entities/gamification-points.entity';
import { User } from '../users/entities/user.entity';
export declare class GamificationService {
    private gamificationPointsRepository;
    private userRepository;
    constructor(gamificationPointsRepository: Repository<GamificationPoints>, userRepository: Repository<User>);
    getUserPoints(userId: string): Promise<GamificationPoints>;
    addPoints(userId: string, pointsToAdd: number, reason: string): Promise<GamificationPoints>;
    addBadge(userId: string, badgeName: string): Promise<GamificationPoints>;
    addAchievement(userId: string, achievementName: string): Promise<GamificationPoints>;
    getLeaderboard(schoolId: string, limit?: number): Promise<GamificationPoints[]>;
}
