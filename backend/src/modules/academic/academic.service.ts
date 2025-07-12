import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicProgress, EvaluationType } from './entities/academic-progress.entity';
import { User } from '../users/entities/user.entity';
import { AiService } from '../ai/ai.service';

@Injectable()
export class AcademicService {
  constructor(
    @InjectRepository(AcademicProgress)
    private academicProgressRepository: Repository<AcademicProgress>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private aiService: AiService,
  ) {}

  async createProgress(progressData: {
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
  }): Promise<AcademicProgress> {
    const progress = this.academicProgressRepository.create(progressData);
    
    // Generate AI insights if score is provided
    if (progress.score !== undefined) {
      progress.aiInsights = await this.generateInsights(progress.studentId, progress.subject, progress.score, progress.maxScore);
    }

    return await this.academicProgressRepository.save(progress);
  }

  async getStudentProgress(studentId: number, subject?: string): Promise<AcademicProgress[]> {
    const where: any = { studentId };
    if (subject) {
      where.subject = subject;
    }

    return await this.academicProgressRepository.find({
      where,
      order: { date: 'DESC' }
    });
  }

  async getStudentAverage(studentId: number, subject?: string): Promise<number> {
    const progress = await this.getStudentProgress(studentId, subject);
    
    if (progress.length === 0) return 0;

    const totalScore = progress.reduce((sum, p) => sum + (p.score || 0), 0);
    const totalMaxScore = progress.reduce((sum, p) => sum + (p.maxScore || 100), 0);

    return totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;
  }

  async getSubjectProgress(studentId: number, subject: string): Promise<{
    average: number;
    trend: 'improving' | 'declining' | 'stable';
    recentScores: number[];
    recommendations: string[];
  }> {
    const progress = await this.getStudentProgress(studentId, subject);
    
    if (progress.length === 0) {
      return {
        average: 0,
        trend: 'stable',
        recentScores: [],
        recommendations: ['Encara no tens avaluacions en aquesta assignatura.']
      };
    }

    const scores = progress.map(p => p.percentage).filter(s => s > 0);
    const average = scores.length > 0 ? scores.reduce((sum, s) => sum + s, 0) / scores.length : 0;

    // Calculate trend
    const recentScores = scores.slice(0, 5); // Last 5 scores
    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    
    if (recentScores.length >= 2) {
      const firstHalf = recentScores.slice(0, Math.ceil(recentScores.length / 2));
      const secondHalf = recentScores.slice(Math.ceil(recentScores.length / 2));
      
      const firstAvg = firstHalf.reduce((sum, s) => sum + s, 0) / firstHalf.length;
      const secondAvg = secondHalf.reduce((sum, s) => sum + s, 0) / secondHalf.length;
      
      if (secondAvg > firstAvg + 5) trend = 'improving';
      else if (secondAvg < firstAvg - 5) trend = 'declining';
    }

    // Generate recommendations
    const recommendations = await this.generateRecommendations(average, trend, subject);

    return {
      average,
      trend,
      recentScores,
      recommendations
    };
  }

  async updateProgress(id: number, updateData: Partial<AcademicProgress>): Promise<AcademicProgress> {
    const progress = await this.academicProgressRepository.findOne({ where: { id } });
    
    if (!progress) {
      throw new Error('Academic progress not found');
    }

    Object.assign(progress, updateData);

    // Regenerate AI insights if score changed
    if (updateData.score !== undefined) {
      progress.aiInsights = await this.generateInsights(
        progress.studentId, 
        progress.subject, 
        progress.score, 
        progress.maxScore
      );
    }

    return await this.academicProgressRepository.save(progress);
  }

  async deleteProgress(id: number): Promise<void> {
    await this.academicProgressRepository.delete(id);
  }

  private async generateInsights(studentId: number, subject: string, score: number, maxScore: number = 100): Promise<any> {
    const percentage = (score / maxScore) * 100;
    
    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    let recommendation = '';

    if (percentage >= 90) {
      recommendation = 'Excel·lent treball! Continua mantenint aquest alt nivell.';
      riskLevel = 'low';
    } else if (percentage >= 80) {
      recommendation = 'Bon treball. Pots millorar una mica més amb més pràctica.';
      riskLevel = 'low';
    } else if (percentage >= 70) {
      recommendation = 'Treball acceptable. Necessites més esforç per millorar.';
      riskLevel = 'medium';
    } else if (percentage >= 60) {
      recommendation = 'Atenció: Necessites ajuda addicional per aprovar.';
      riskLevel = 'high';
    } else {
      recommendation = 'Urgent: Necessites suport immediat per evitar el suspens.';
      riskLevel = 'high';
    }

    return {
      trend,
      recommendation,
      riskLevel,
      strengths: percentage >= 80 ? ['Bona comprensió dels conceptes bàsics'] : [],
      areasForImprovement: percentage < 80 ? ['Necessita més pràctica', 'Revisar conceptes fonamentals'] : [],
      predictedNextScore: Math.min(100, percentage + (percentage >= 80 ? 5 : 10))
    };
  }

  private async generateRecommendations(average: number, trend: string, subject: string): Promise<string[]> {
    const recommendations: string[] = [];

    if (average < 60) {
      recommendations.push('Necessites suport addicional per aprovar aquesta assignatura.');
      recommendations.push('Considera demanar ajuda al professor o un tutor.');
    } else if (average < 80) {
      recommendations.push('Pots millorar amb més pràctica i estudi.');
      recommendations.push('Revisa els conceptes que no entens completament.');
    } else {
      recommendations.push('Excel·lent progrés! Continua així.');
    }

    if (trend === 'declining') {
      recommendations.push('El teu rendiment està baixant. Revisa els teus mètodes d\'estudi.');
    } else if (trend === 'improving') {
      recommendations.push('El teu progrés està millorant. Manté la motivació!');
    }

    return recommendations;
  }
} 