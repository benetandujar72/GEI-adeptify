import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { GamificationPoints } from '../../gamification/entities/gamification-points.entity';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  PARENT = 'parent',
  FAMILY = 'family',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'json', nullable: true })
  preferences: Record<string, any>;

  @Column({ nullable: true })
  googleId: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @Column({ nullable: true })
  classId: string;

  @Column({ nullable: true })
  familyId: string;

  @Column({ type: 'json', nullable: true })
  gamification: {
    points?: number;
    level?: number;
    badges?: string[];
    achievements?: string[];
  };

  // Relación con School
  @Column({ nullable: true })
  schoolId: number;

  @ManyToOne(() => School, school => school.users)
  @JoinColumn({ name: 'schoolId' })
  school: School;

  // Relación con GamificationPoints
  @OneToMany(() => GamificationPoints, points => points.user)
  gamificationPoints: GamificationPoints[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual getters
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  get isTeacher(): boolean {
    return this.role === UserRole.TEACHER;
  }

  get isStudent(): boolean {
    return this.role === UserRole.STUDENT;
  }

  get isParent(): boolean {
    return this.role === UserRole.PARENT;
  }
}