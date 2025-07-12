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

export enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
  RESERVATION = 'reservation',
  MESSAGE = 'message',
  ACADEMIC = 'academic',
  SYSTEM = 'system',
}

@Entity('notifications')
@Index(['userId', 'isRead'])
@Index(['userId', 'type'])
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'enum', enum: NotificationType, default: NotificationType.INFO })
  type: NotificationType;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  actionUrl: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    reservationId?: number;
    messageId?: number;
    academicProgressId?: number;
    gamificationPoints?: number;
    badgeEarned?: string;
    achievementUnlocked?: string;
    [key: string]: any;
  };

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;
} 