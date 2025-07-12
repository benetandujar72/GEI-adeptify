import { Repository } from 'typeorm';
import { AcademicProgress, EvaluationType } from './entities/academic-progress.entity';
import { User } from '../users/entities/user.entity';
import { AiService } from '../ai/ai.service';
export declare class AcademicService {
    private academicProgressRepository;
    private userRepository;
    private aiService;
    constructor(academicProgressRepository: Repository<AcademicProgress>, userRepository: Repository<User>, aiService: AiService);
    createProgress(progressData: {
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
    }): Promise<AcademicProgress>;
    getStudentProgress(studentId: number, subject?: string): Promise<AcademicProgress[]>;
    getStudentAverage(studentId: number, subject?: string): Promise<number>;
    getSubjectProgress(studentId: number, subject: string): Promise<{
        average: number;
        trend: 'improving' | 'declining' | 'stable';
        recentScores: number[];
        recommendations: string[];
    }>;
    updateProgress(id: number, updateData: Partial<AcademicProgress>): Promise<AcademicProgress>;
    deleteProgress(id: number): Promise<void>;
    private generateInsights;
    private generateRecommendations;
}
