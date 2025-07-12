import { CommunicationsService } from './communications.service';
import { MessageType } from './entities/message.entity';
export declare class CommunicationsController {
    private readonly communicationsService;
    constructor(communicationsService: CommunicationsService);
    sendMessage(req: any, body: {
        receiverId: number;
        content: string;
        subject?: string;
        type?: MessageType;
    }): Promise<import("./entities/message.entity").Message>;
    getMessages(req: any, body: {
        limit?: number;
    }): Promise<import("./entities/message.entity").Message[]>;
    getUnreadMessages(req: any): Promise<import("./entities/message.entity").Message[]>;
    markMessageAsRead(id: string, req: any): Promise<import("./entities/message.entity").Message>;
    translateMessage(id: string, body: {
        targetLanguage: string;
    }): Promise<import("./entities/message.entity").Message>;
    getNotifications(req: any, body: {
        limit?: number;
    }): Promise<import("./entities/notification.entity").Notification[]>;
    getUnreadNotifications(req: any): Promise<import("./entities/notification.entity").Notification[]>;
    markNotificationAsRead(id: string, req: any): Promise<import("./entities/notification.entity").Notification>;
    markAllNotificationsAsRead(req: any): Promise<void>;
}
