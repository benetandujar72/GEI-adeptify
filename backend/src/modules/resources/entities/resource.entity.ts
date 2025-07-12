import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { School } from '../../schools/entities/school.entity';

export enum ResourceType {
  CLASSROOM = 'classroom',
  LABORATORY = 'laboratory',
  GYMNASIUM = 'gymnasium',
  LIBRARY = 'library',
  AUDITORIUM = 'auditorium',
  COMPUTER_ROOM = 'computer_room',
  MUSIC_ROOM = 'music_room',
  ART_ROOM = 'art_room',
  CAFETERIA = 'cafeteria',
  PLAYGROUND = 'playground',
  EQUIPMENT = 'equipment',
  VEHICLE = 'vehicle',
}

export enum ResourceStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  MAINTENANCE = 'maintenance',
  RESERVED = 'reserved',
  OUT_OF_SERVICE = 'out_of_service',
}

@Entity('resources')
@Index(['name', 'schoolId'], { unique: true })
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: ResourceType,
  })
  type: ResourceType;

  @Column({
    type: 'enum',
    enum: ResourceStatus,
    default: ResourceStatus.AVAILABLE,
  })
  status: ResourceStatus;

  @Column({ type: 'int', nullable: true })
  schoolId: number;

  @ManyToOne(() => School, school => school.resources)
  @JoinColumn({ name: 'schoolId' })
  school: School;

  @Column({ length: 50, nullable: true })
  building?: string;

  @Column({ length: 20, nullable: true })
  floor?: string;

  @Column({ length: 20, nullable: true })
  roomNumber?: string;

  @Column({ type: 'int', nullable: true })
  capacity?: number;

  @Column({ type: 'jsonb', nullable: true })
  features?: {
    projector?: boolean;
    whiteboard?: boolean;
    computers?: number;
    internet?: boolean;
    airConditioning?: boolean;
    accessibility?: boolean;
    audioSystem?: boolean;
    lighting?: string[];
  };

  @Column({ type: 'jsonb', nullable: true })
  schedule?: {
    monday?: { start: string; end: string }[];
    tuesday?: { start: string; end: string }[];
    wednesday?: { start: string; end: string }[];
    thursday?: { start: string; end: string }[];
    friday?: { start: string; end: string }[];
    saturday?: { start: string; end: string }[];
    sunday?: { start: string; end: string }[];
  };

  @Column({ type: 'jsonb', nullable: true })
  restrictions?: {
    minAdvanceBooking?: number; // hours
    maxAdvanceBooking?: number; // days
    maxDuration?: number; // hours
    allowedRoles?: string[];
    requiresApproval?: boolean;
    specialRequirements?: string[];
  };

  @Column({ type: 'jsonb', nullable: true })
  maintenance?: {
    lastMaintenance?: Date;
    nextMaintenance?: Date;
    maintenanceNotes?: string;
    responsiblePerson?: string;
  };

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  hourlyRate?: number;

  @Column({ type: 'jsonb', nullable: true })
  location?: {
    latitude?: number;
    longitude?: number;
    address?: string;
    coordinates?: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  images?: string[];

  @Column({ type: 'jsonb', nullable: true })
  documents?: {
    name: string;
    url: string;
    type: string;
  }[];

  @Column({ type: 'uuid', nullable: true })
  responsibleTeacherId?: string;

  @Column({ type: 'uuid', nullable: true })
  departmentId?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual properties
  get isAvailable(): boolean {
    return this.status === ResourceStatus.AVAILABLE;
  }

  get isBookable(): boolean {
    return this.isActive && this.status !== ResourceStatus.OUT_OF_SERVICE;
  }

  get fullLocation(): string {
    const parts = [this.building, this.floor, this.roomNumber].filter(Boolean);
    return parts.join(' - ');
  }
}