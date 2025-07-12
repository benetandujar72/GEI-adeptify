import { User } from '../../users/entities/user.entity';
export declare enum MessageType {
    DIRECT = "direct",
    BROADCAST = "broadcast",
    URGENT = "urgent",
    SYSTEM = "system"
}
export declare enum MessagePriority {
    LOW = "low",
    NORMAL = "normal",
    HIGH = "high",
    URGENT = "urgent"
}
export declare class Message {
    id: number;
    senderId: number;
    receiverId: number;
    subject: string;
    content: string;
    type: MessageType;
    priority: MessagePriority;
    isRead: boolean;
    parentMessageId: number;
    attachments: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[];
    translatedContent: {
        [language: string]: string;
    };
    metadata: {
        originalLanguage?: string;
        translationProvider?: string;
        readAt?: Date;
        deliveredAt?: Date;
    };
    createdAt: Date;
    updatedAt: Date;
    sender: User;
    receiver: User;
    parentMessage: Message;
}
