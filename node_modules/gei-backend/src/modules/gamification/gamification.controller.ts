import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('gamification')
@UseGuards(JwtAuthGuard)
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('points')
  async getUserPoints(@Request() req) {
    return await this.gamificationService.getUserPoints(req.user.id);
  }

  @Get('leaderboard')
  async getLeaderboard(@Request() req, @Body() body: { limit?: number }) {
    return await this.gamificationService.getLeaderboard(req.user.schoolId, body.limit);
  }

  @Post('points/add')
  async addPoints(@Request() req, @Body() body: { points: number; reason: string }) {
    return await this.gamificationService.addPoints(req.user.id, body.points, body.reason);
  }

  @Post('badges/add')
  async addBadge(@Request() req, @Body() body: { badgeName: string }) {
    return await this.gamificationService.addBadge(req.user.id, body.badgeName);
  }

  @Post('achievements/add')
  async addAchievement(@Request() req, @Body() body: { achievementName: string }) {
    return await this.gamificationService.addAchievement(req.user.id, body.achievementName);
  }
} 