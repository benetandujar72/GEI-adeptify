import { User } from '../../users/entities/user.entity';
export declare enum EvaluationType {
    QUIZ = "quiz",
    EXAM = "exam",
    ASSIGNMENT = "assignment",
    PROJECT = "project",
    PARTICIPATION = "participation",
    HOMEWORK = "homework",
    PRESENTATION = "presentation",
    LABORATORY = "laboratory"
}
export declare class AcademicProgress {
    id: number;
    studentId: string;
    subject: string;
    evaluationType: EvaluationType;
    title: string;
    description: string;
    score: number;
    maxScore: number;
    feedback: string;
    date: Date;
    aiInsights: {
        trend?: 'improving' | 'declining' | 'stable';
        recommendation?: string;
        riskLevel?: 'low' | 'medium' | 'high';
        strengths?: string[];
        areasForImprovement?: string[];
        predictedNextScore?: number;
    };
    metadata: {
        teacherId?: number;
        classId?: number;
        academicYear?: string;
        semester?: string;
        weight?: number;
        category?: string;
        [key: string]: any;
    };
    createdAt: Date;
    updatedAt: Date;
    student: User;
    get percentage(): number;
    get grade(): string;
    get isPassing(): boolean;
}
