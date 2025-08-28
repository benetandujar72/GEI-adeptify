import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('gamification_points')
export class GamificationPoints {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'int', default: 0 })
  points: number;

  @Column({ type: 'int', default: 1 })
  level: number;

  @Column({ type: 'int', default: 0 })
  xp: number;

  @Column({ type: 'jsonb', default: [] })
  badges: string[];

  @Column({ type: 'jsonb', default: [] })
  achievements: string[];

  @Column({ type: 'timestamp', nullable: true })
  lastActivity: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;
}