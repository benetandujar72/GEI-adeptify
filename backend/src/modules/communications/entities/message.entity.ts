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

export enum MessageType {
  DIRECT = 'direct',
  BROADCAST = 'broadcast',
  URGENT = 'urgent',
  SYSTEM = 'system',
}

export enum MessagePriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('messages')
@Index(['senderId', 'receiverId'])
@Index(['receiverId', 'isRead'])
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  senderId: string;

  @Column({ type: 'varchar' })
  receiverId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  subject: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: MessageType, default: MessageType.DIRECT })
  type: MessageType;

  @Column({ type: 'enum', enum: MessagePriority, default: MessagePriority.NORMAL })
  priority: MessagePriority;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @Column({ type: 'int', nullable: true })
  parentMessageId: number;

  @Column({ type: 'jsonb', nullable: true })
  attachments: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];

  @Column({ type: 'jsonb', nullable: true })
  translatedContent: {
    [language: string]: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    originalLanguage?: string;
    translationProvider?: string;
    readAt?: Date;
    deliveredAt?: Date;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @ManyToOne(() => Message, message => message.id)
  @JoinColumn({ name: 'parentMessageId' })
  parentMessage: Message;
}