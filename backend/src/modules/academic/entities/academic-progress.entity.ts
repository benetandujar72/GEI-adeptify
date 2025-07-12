import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum EvaluationType {
  QUIZ = 'quiz',
  EXAM = 'exam',
  ASSIGNMENT = 'assignment',
  PROJECT = 'project',
  PARTICIPATION = 'participation',
  HOMEWORK = 'homework',
  PRESENTATION = 'presentation',
  LABORATORY = 'laboratory',
}

@Entity('academic_progress')
@Index(['studentId', 'subject'])
@Index(['studentId', 'date'])
export class AcademicProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  studentId: number;

  @Column({ type: 'varchar', length: 100 })
  subject: string;

  @Column({ type: 'enum', enum: EvaluationType })
  evaluationType: EvaluationType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  score: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 100 })
  maxScore: number;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'jsonb', nullable: true })
  aiInsights: {
    trend?: 'improving' | 'declining' | 'stable';
    recommendation?: string;
    riskLevel?: 'low' | 'medium' | 'high';
    strengths?: string[];
    areasForImprovement?: string[];
    predictedNextScore?: number;
  };

  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    teacherId?: number;
    classId?: number;
    academicYear?: string;
    semester?: string;
    weight?: number;
    category?: string;
    [key: string]: any;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'studentId' })
  student: User;

  // Virtual properties
  get percentage(): number {
    if (!this.score || !this.maxScore) return 0;
    return (this.score / this.maxScore) * 100;
  }

  get grade(): string {
    const percentage = this.percentage;
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }

  get isPassing(): boolean {
    return this.percentage >= 60;
  }
} 