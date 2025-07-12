import { AcademicService } from './academic.service';
import { EvaluationType } from './entities/academic-progress.entity';
export declare class AcademicController {
    private readonly academicService;
    constructor(academicService: AcademicService);
    createProgress(req: any, body: {
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
    }): Promise<import("./entities/academic-progress.entity").AcademicProgress>;
    getStudentProgress(studentId: string, body: {
        subject?: string;
    }): Promise<import("./entities/academic-progress.entity").AcademicProgress[]>;
    getStudentAverage(studentId: string, body: {
        subject?: string;
    }): Promise<number>;
    getSubjectProgress(studentId: string, subject: string): Promise<{
        average: number;
        trend: "improving" | "declining" | "stable";
        recentScores: number[];
        recommendations: string[];
    }>;
    updateProgress(id: string, updateData: any): Promise<import("./entities/academic-progress.entity").AcademicProgress>;
    deleteProgress(id: string): Promise<void>;
    getMyProgress(req: any, body: {
        subject?: string;
    }): Promise<import("./entities/academic-progress.entity").AcademicProgress[]>;
    getMyAverage(req: any, body: {
        subject?: string;
    }): Promise<number>;
}
