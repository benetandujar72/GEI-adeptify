"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
const notification_entity_1 = require("./entities/notification.entity");
const user_entity_1 = require("../users/entities/user.entity");
const ai_service_1 = require("../ai/ai.service");
let CommunicationsService = class CommunicationsService {
    constructor(messageRepository, notificationRepository, userRepository, aiService) {
        this.messageRepository = messageRepository;
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.aiService = aiService;
    }
    async sendMessage(senderId, receiverId, content, subject, type = message_entity_1.MessageType.DIRECT) {
        const message = this.messageRepository.create({
            senderId,
            receiverId,
            content,
            subject,
            type,
            priority: type === message_entity_1.MessageType.URGENT ? message_entity_1.MessagePriority.HIGH : message_entity_1.MessagePriority.NORMAL
        });
        const savedMessage = await this.messageRepository.save(message);
        await this.createNotification(receiverId, {
            title: `Nou missatge${subject ? `: ${subject}` : ''}`,
            message: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
            type: notification_entity_1.NotificationType.MESSAGE,
            actionUrl: `/messages/${savedMessage.id}`,
            metadata: { messageId: savedMessage.id }
        });
        return savedMessage;
    }
    async getMessages(userId, limit = 50) {
        return await this.messageRepository.find({
            where: [
                { senderId: userId },
                { receiverId: userId }
            ],
            order: { createdAt: 'DESC' },
            take: limit,
            relations: ['sender', 'receiver']
        });
    }
    async getUnreadMessages(userId) {
        return await this.messageRepository.find({
            where: { receiverId: userId, isRead: false },
            order: { createdAt: 'DESC' },
            relations: ['sender']
        });
    }
    async markMessageAsRead(messageId, userId) {
        const message = await this.messageRepository.findOne({
            where: { id: messageId, receiverId: userId }
        });
        if (message) {
            message.isRead = true;
            return await this.messageRepository.save(message);
        }
        return message;
    }
    async translateMessage(messageId, targetLanguage) {
        const message = await this.messageRepository.findOne({
            where: { id: messageId }
        });
        if (message && !message.translatedContent?.[targetLanguage]) {
            const translatedText = await this.aiService.translateMessage(message.content, targetLanguage);
            message.translatedContent = {
                ...message.translatedContent,
                [targetLanguage]: translatedText
            };
            return await this.messageRepository.save(message);
        }
        return message;
    }
    async createNotification(userId, notificationData) {
        const notification = this.notificationRepository.create({
            userId,
            ...notificationData
        });
        return await this.notificationRepository.save(notification);
    }
    async getUserNotifications(userId, limit = 20) {
        return await this.notificationRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
            take: limit
        });
    }
    async getUnreadNotifications(userId) {
        return await this.notificationRepository.find({
            where: { userId, isRead: false },
            order: { createdAt: 'DESC' }
        });
    }
    async markNotificationAsRead(notificationId, userId) {
        const notification = await this.notificationRepository.findOne({
            where: { id: notificationId, userId }
        });
        if (notification) {
            notification.isRead = true;
            notification.readAt = new Date();
            return await this.notificationRepository.save(notification);
        }
        return notification;
    }
    async markAllNotificationsAsRead(userId) {
        await this.notificationRepository.update({ userId, isRead: false }, { isRead: true, readAt: new Date() });
    }
};
exports.CommunicationsService = CommunicationsService;
exports.CommunicationsService = CommunicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(1, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        ai_service_1.AiService])
], CommunicationsService);
//# sourceMappingURL=communications.service.js.map