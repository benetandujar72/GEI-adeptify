import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { School } from '../../schools/entities/school.entity';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  FAMILY = 'family',
  SUPPORT_STAFF = 'support_staff',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

@Entity('users')
@Index(['email', 'schoolId'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Column({ nullable: true })
  googleId?: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'jsonb', nullable: true })
  preferences?: {
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
      whatsapp: boolean;
    };
    theme: 'light' | 'dark' | 'auto';
  };

  @Column({ type: 'int', nullable: true })
  schoolId: number;

  @ManyToOne(() => School, school => school.users)
  @JoinColumn({ name: 'schoolId' })
  school: School;

  @Column({ type: 'uuid', nullable: true })
  classId?: string;

  @Column({ type: 'uuid', nullable: true })
  familyId?: string;

  @Column({ type: 'jsonb', nullable: true })
  academicInfo?: {
    grade?: string;
    subjects?: string[];
    academicYear?: string;
    teacherId?: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  gamification?: {
    points: number;
    level: number;
    badges: string[];
    achievements: string[];
  };

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  phoneVerifiedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual properties
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get isActive(): boolean {
    return this.status === UserStatus.ACTIVE;
  }

  get isTeacher(): boolean {
    return this.role === UserRole.TEACHER;
  }

  get isStudent(): boolean {
    return this.role === UserRole.STUDENT;
  }

  get isFamily(): boolean {
    return this.role === UserRole.FAMILY;
  }

  get isAdmin(): boolean {
    return this.role === UserRole.ADMIN || this.role === UserRole.SUPER_ADMIN;
  }
} 