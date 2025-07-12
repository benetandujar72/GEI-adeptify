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
    sendMessage(senderId: number, receiverId: number, content: string, subject?: string, type?: MessageType): Promise<Message>;
    getMessages(userId: number, limit?: number): Promise<Message[]>;
    getUnreadMessages(userId: number): Promise<Message[]>;
    markMessageAsRead(messageId: number, userId: number): Promise<Message>;
    translateMessage(messageId: number, targetLanguage: string): Promise<Message>;
    createNotification(userId: number, notificationData: {
        title: string;
        message: string;
        type: NotificationType;
        actionUrl?: string;
        metadata?: any;
    }): Promise<Notification>;
    getUserNotifications(userId: number, limit?: number): Promise<Notification[]>;
    getUnreadNotifications(userId: number): Promise<Notification[]>;
    markNotificationAsRead(notificationId: number, userId: number): Promise<Notification>;
    markAllNotificationsAsRead(userId: number): Promise<void>;
}
