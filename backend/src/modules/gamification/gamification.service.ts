import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GamificationPoints } from './entities/gamification-points.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(GamificationPoints)
    private gamificationPointsRepository: Repository<GamificationPoints>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserPoints(userId: number): Promise<GamificationPoints> {
    let points = await this.gamificationPointsRepository.findOne({
      where: { userId }
    });

    if (!points) {
      points = this.gamificationPointsRepository.create({
        userId,
        points: 0,
        level: 1,
        xp: 0,
        badges: [],
        achievements: []
      });
      await this.gamificationPointsRepository.save(points);
    }

    return points;
  }

  async addPoints(userId: number, pointsToAdd: number, reason: string): Promise<GamificationPoints> {
    const points = await this.getUserPoints(userId);
    
    points.points += pointsToAdd;
    points.xp += pointsToAdd;
    points.lastActivity = new Date();

    // Calculate new level (every 1000 XP = 1 level)
    const newLevel = Math.floor(points.xp / 1000) + 1;
    if (newLevel > points.level) {
      points.level = newLevel;
      // Add level up badge
      if (!points.badges.includes(`level_${newLevel}`)) {
        points.badges.push(`level_${newLevel}`);
      }
    }

    return await this.gamificationPointsRepository.save(points);
  }

  async addBadge(userId: number, badgeName: string): Promise<GamificationPoints> {
    const points = await this.getUserPoints(userId);
    
    if (!points.badges.includes(badgeName)) {
      points.badges.push(badgeName);
      return await this.gamificationPointsRepository.save(points);
    }

    return points;
  }

  async addAchievement(userId: number, achievementName: string): Promise<GamificationPoints> {
    const points = await this.getUserPoints(userId);
    
    if (!points.achievements.includes(achievementName)) {
      points.achievements.push(achievementName);
      return await this.gamificationPointsRepository.save(points);
    }

    return points;
  }

  async getLeaderboard(schoolId: number, limit: number = 10): Promise<GamificationPoints[]> {
    return await this.gamificationPointsRepository
      .createQueryBuilder('gp')
      .leftJoin('gp.user', 'user')
      .where('user.schoolId = :schoolId', { schoolId })
      .orderBy('gp.points', 'DESC')
      .limit(limit)
      .getMany();
  }
} 