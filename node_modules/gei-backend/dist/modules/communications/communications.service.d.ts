import { Repository } from 'typeorm';
import { Message, MessageType } from './entities/message.entity';
import { Notification, NotificationType } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';
import { AiService } from '../ai/ai.service';
export declare class CommunicationsService {
    private messageRepository;
    private notificationRepository;
    private userRepository;
    private aiService;
    constructor(messageRepository: Repository<Message>, notificationRepository: Repository<Notification>, userRepository: Repository<User>, aiService: AiService);
    sendMessage(senderId: string, receiverId: string, content: string, subject?: string, type?: MessageType): Promise<Message>;
    getMessages(userId: string, limit?: number): Promise<Message[]>;
    getUnreadMessages(userId: string): Promise<Message[]>;
    markMessageAsRead(messageId: number, userId: string): Promise<Message>;
    translateMessage(messageId: number, targetLanguage: string): Promise<Message>;
    createNotification(userId: string, notificationData: {
        title: string;
        message: string;
        type: NotificationType;
        actionUrl?: string;
        metadata?: any;
    }): Promise<Notification>;
    getUserNotifications(userId: string, limit?: number): Promise<Notification[]>;
    getUnreadNotifications(userId: string): Promise<Notification[]>;
    markNotificationAsRead(notificationId: number, userId: string): Promise<Notification>;
    markAllNotificationsAsRead(userId: string): Promise<void>;
}
