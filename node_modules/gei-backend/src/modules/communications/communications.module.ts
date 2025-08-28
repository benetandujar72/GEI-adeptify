import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationsController } from './communications.controller';
import { CommunicationsService } from './communications.service';
import { Message } from './entities/message.entity';
import { Notification } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Notification, User]),
    AiModule
  ],
  controllers: [CommunicationsController],
  providers: [CommunicationsService],
  exports: [CommunicationsService],
})
export class CommunicationsModule {} 