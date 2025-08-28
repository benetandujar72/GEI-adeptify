import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicController } from './academic.controller';
import { AcademicService } from './academic.service';
import { AcademicProgress } from './entities/academic-progress.entity';
import { User } from '../users/entities/user.entity';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AcademicProgress, User]),
    AiModule
  ],
  controllers: [AcademicController],
  providers: [AcademicService],
  exports: [AcademicService],
})
export class AcademicModule {} 