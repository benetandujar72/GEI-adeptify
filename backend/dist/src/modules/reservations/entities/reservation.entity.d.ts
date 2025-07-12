export declare enum ReservationStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
    COMPLETED = "completed",
    REJECTED = "rejected"
}
export declare enum ReservationType {
    CLASS = "class",
    MEETING = "meeting",
    EVENT = "event",
    MAINTENANCE = "maintenance",
    PERSONAL = "personal",
    EXTRA_CURRICULAR = "extra_curricular"
}
export declare class Reservation {
    id: string;
    resourceId: string;
    userId: string;
    schoolId: string;
    startTime: Date;
    endTime: Date;
    title: string;
    description?: string;
    type: ReservationType;
    status: ReservationStatus;
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
    participants?: {
        userIds: string[];
        externalParticipants?: {
            name: string;
            email?: string;
            phone?: string;
        }[];
    };
    requirements?: {
        equipment?: string[];
        setup?: string[];
        specialNeeds?: string[];
        notes?: string;
    };
    notifications?: {
        emailSent?: boolean;
        smsSent?: boolean;
        pushSent?: boolean;
        whatsappSent?: boolean;
        reminderSent?: boolean;
    };
    recurring?: {
        pattern: 'daily' | 'weekly' | 'monthly' | 'yearly';
        interval: number;
        endDate?: Date;
        exceptions?: Date[];
    };
    parentReservationId?: string;
    approvedBy?: string;
    approvedAt?: Date;
    rejectionReason?: string;
    cancelledBy?: string;
    cancelledAt?: Date;
    cancellationReason?: string;
    feedback?: {
        rating?: number;
        comment?: string;
        submittedAt?: Date;
    };
    metadata?: {
        source?: 'ai' | 'manual' | 'import';
        tags?: string[];
        priority?: 'low' | 'medium' | 'high';
        category?: string;
    };
    createdAt: Date;
    updatedAt: Date;
    get duration(): number;
    get isActive(): boolean;
    get isUpcoming(): boolean;
    get isRecurring(): boolean;
    get isPendingApproval(): boolean;
}
