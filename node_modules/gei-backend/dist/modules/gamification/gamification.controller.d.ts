import { GamificationService } from './gamification.service';
export declare class GamificationController {
    private readonly gamificationService;
    constructor(gamificationService: GamificationService);
    getUserPoints(req: any): Promise<import("./entities/gamification-points.entity").GamificationPoints>;
    getLeaderboard(req: any, body: {
        limit?: number;
    }): Promise<import("./entities/gamification-points.entity").GamificationPoints[]>;
    addPoints(req: any, body: {
        points: number;
        reason: string;
    }): Promise<import("./entities/gamification-points.entity").GamificationPoints>;
    addBadge(req: any, body: {
        badgeName: string;
    }): Promise<import("./entities/gamification-points.entity").GamificationPoints>;
    addAchievement(req: any, body: {
        achievementName: string;
    }): Promise<import("./entities/gamification-points.entity").GamificationPoints>;
}
