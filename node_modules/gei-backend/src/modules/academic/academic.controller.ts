import { Controller, Get, Post, Body, Param, UseGuards, Request, Patch, Delete } from '@nestjs/common';
import { AcademicService } from './academic.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EvaluationType } from './entities/academic-progress.entity';

@Controller('academic')
@UseGuards(JwtAuthGuard)
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}

  @Post('progress')
  async createProgress(@Request() req, @Body() body: {
    studentId: number;
    subject: string;
    evaluationType: EvaluationType;
    title: string;
    description?: string;
    score?: number;
    maxScore?: number;
    feedback?: string;
    date: Date;
    metadata?: any;
  }) {
    return await this.academicService.createProgress({
      ...body,
      studentId: body.studentId.toString()
    });
  }

  @Get('progress/:studentId')
  async getStudentProgress(@Param('studentId') studentId: string, @Body() body: { subject?: string }) {
    return await this.academicService.getStudentProgress(studentId, body.subject);
  }

  @Get('progress/:studentId/average')
  async getStudentAverage(@Param('studentId') studentId: string, @Body() body: { subject?: string }) {
    return await this.academicService.getStudentAverage(studentId, body.subject);
  }

  @Get('progress/:studentId/subject/:subject')
  async getSubjectProgress(@Param('studentId') studentId: string, @Param('subject') subject: string) {
    return await this.academicService.getSubjectProgress(studentId, subject);
  }

  @Patch('progress/:id')
  async updateProgress(@Param('id') id: string, @Body() updateData: any) {
    return await this.academicService.updateProgress(+id, updateData);
  }

  @Delete('progress/:id')
  async deleteProgress(@Param('id') id: string) {
    return await this.academicService.deleteProgress(+id);
  }

  @Get('my-progress')
  async getMyProgress(@Request() req, @Body() body: { subject?: string }) {
    return await this.academicService.getStudentProgress(req.user.id, body.subject);
  }

  @Get('my-average')
  async getMyAverage(@Request() req, @Body() body: { subject?: string }) {
    return await this.academicService.getStudentAverage(req.user.id, body.subject);
  }
} 