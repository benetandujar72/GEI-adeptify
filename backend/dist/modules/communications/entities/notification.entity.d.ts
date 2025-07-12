import { User } from '../../users/entities/user.entity';
export declare enum NotificationType {
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
    SUCCESS = "success",
    RESERVATION = "reservation",
    MESSAGE = "message",
    ACADEMIC = "academic",
    SYSTEM = "system"
}
export declare class Notification {
    id: number;
    userId: number;
    title: string;
    message: string;
    type: NotificationType;
    isRead: boolean;
    actionUrl: string;
    metadata: {
        reservationId?: number;
        messageId?: number;
        academicProgressId?: number;
        gamificationPoints?: number;
        badgeEarned?: string;
        achievementUnlocked?: string;
        [key: string]: any;
    };
    readAt: Date;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
