import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

export enum ReservationType {
  CLASS = 'class',
  MEETING = 'meeting',
  EVENT = 'event',
  MAINTENANCE = 'maintenance',
  PERSONAL = 'personal',
  EXTRA_CURRICULAR = 'extra_curricular',
}

@Entity('reservations')
@Index(['resourceId', 'startTime', 'endTime'])
@Index(['userId', 'startTime'])
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  resourceId: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  schoolId: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: ReservationType })
  type: ReservationType;

  @Column({ type: 'enum', enum: ReservationStatus, default: ReservationStatus.PENDING })
  status: ReservationStatus;

  @Column({ type: 'jsonb', nullable: true })
  aiProcessing?: {
    originalPrompt?: string;
    interpretedData?: {
      resourceName?: string;
      startTime?: string;
      endTime?: string;
      description?: string;
      type?: string;
    };
    confidence?: number;
    processingTime?: number;
    model?: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  participants?: {
    userIds: string[];
    externalParticipants?: {
      name: string;
      email?: string;
      phone?: string;
    }[];
  };

  @Column({ type: 'jsonb', nullable: true })
  requirements?: {
    equipment?: string[];
    setup?: string[];
    specialNeeds?: string[];
    notes?: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  notifications?: {
    emailSent?: boolean;
    smsSent?: boolean;
    pushSent?: boolean;
    whatsappSent?: boolean;
    reminderSent?: boolean;
  };

  @Column({ type: 'jsonb', nullable: true })
  recurring?: {
    pattern: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
    exceptions?: Date[];
  };

  @Column({ type: 'uuid', nullable: true })
  parentReservationId?: string; // For recurring reservations

  @Column({ type: 'uuid', nullable: true })
  approvedBy?: string;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt?: Date;

  @Column({ type: 'text', nullable: true })
  rejectionReason?: string;

  @Column({ type: 'uuid', nullable: true })
  cancelledBy?: string;

  @Column({ type: 'timestamp', nullable: true })
  cancelledAt?: Date;

  @Column({ type: 'text', nullable: true })
  cancellationReason?: string;

  @Column({ type: 'jsonb', nullable: true })
  feedback?: {
    rating?: number;
    comment?: string;
    submittedAt?: Date;
  };

  @Column({ type: 'jsonb', nullable: true })
  metadata?: {
    source?: 'ai' | 'manual' | 'import';
    tags?: string[];
    priority?: 'low' | 'medium' | 'high';
    category?: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual properties
  get duration(): number {
    return (this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60 * 60); // hours
  }

  get isActive(): boolean {
    const now = new Date();
    return this.status === ReservationStatus.CONFIRMED && 
           this.startTime <= now && 
           this.endTime >= now;
  }

  get isUpcoming(): boolean {
    return this.status === ReservationStatus.CONFIRMED && 
           this.startTime > new Date();
  }

  get isRecurring(): boolean {
    return !!this.recurring;
  }

  get isPendingApproval(): boolean {
    return this.status === ReservationStatus.PENDING;
  }
} 