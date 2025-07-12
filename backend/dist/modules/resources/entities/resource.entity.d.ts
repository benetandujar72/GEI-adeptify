import { School } from '../../schools/entities/school.entity';
export declare enum ResourceType {
    CLASSROOM = "classroom",
    LABORATORY = "laboratory",
    GYMNASIUM = "gymnasium",
    LIBRARY = "library",
    AUDITORIUM = "auditorium",
    COMPUTER_ROOM = "computer_room",
    MUSIC_ROOM = "music_room",
    ART_ROOM = "art_room",
    CAFETERIA = "cafeteria",
    PLAYGROUND = "playground",
    EQUIPMENT = "equipment",
    VEHICLE = "vehicle"
}
export declare enum ResourceStatus {
    AVAILABLE = "available",
    OCCUPIED = "occupied",
    MAINTENANCE = "maintenance",
    RESERVED = "reserved",
    OUT_OF_SERVICE = "out_of_service"
}
export declare class Resource {
    id: string;
    name: string;
    description?: string;
    type: ResourceType;
    status: ResourceStatus;
    schoolId: number;
    school: School;
    building?: string;
    floor?: string;
    roomNumber?: string;
    capacity?: number;
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
    schedule?: {
        monday?: {
            start: string;
            end: string;
        }[];
        tuesday?: {
            start: string;
            end: string;
        }[];
        wednesday?: {
            start: string;
            end: string;
        }[];
        thursday?: {
            start: string;
            end: string;
        }[];
        friday?: {
            start: string;
            end: string;
        }[];
        saturday?: {
            start: string;
            end: string;
        }[];
        sunday?: {
            start: string;
            end: string;
        }[];
    };
    restrictions?: {
        minAdvanceBooking?: number;
        maxAdvanceBooking?: number;
        maxDuration?: number;
        allowedRoles?: string[];
        requiresApproval?: boolean;
        specialRequirements?: string[];
    };
    maintenance?: {
        lastMaintenance?: Date;
        nextMaintenance?: Date;
        maintenanceNotes?: string;
        responsiblePerson?: string;
    };
    hourlyRate?: number;
    location?: {
        latitude?: number;
        longitude?: number;
        address?: string;
        coordinates?: string;
    };
    images?: string[];
    documents?: {
        name: string;
        url: string;
        type: string;
    }[];
    responsibleTeacherId?: string;
    departmentId?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    get isAvailable(): boolean;
    get isBookable(): boolean;
    get fullLocation(): string;
}
