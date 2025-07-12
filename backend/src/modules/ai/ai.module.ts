import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Resource } from '../resources/entities/resource.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { AcademicProgress } from '../academic/entities/academic-progress.entity';
import { Message } from '../communications/entities/message.entity';
import { Notification } from '../communications/entities/notification.entity';
import { GamificationPoints } from '../gamification/entities/gamification-points.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Resource,
      Reservation,
      AcademicProgress,
      Message,
      Notification,
      GamificationPoints,
    ]),
  ],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {} 