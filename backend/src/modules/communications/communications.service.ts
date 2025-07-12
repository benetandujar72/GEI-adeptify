import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message, MessageType, MessagePriority } from './entities/message.entity';
import { Notification, NotificationType } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';
import { AiService } from '../ai/ai.service';

@Injectable()
export class CommunicationsService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private aiService: AiService,
  ) {}

  async sendMessage(senderId: number, receiverId: number, content: string, subject?: string, type: MessageType = MessageType.DIRECT): Promise<Message> {
    const message = this.messageRepository.create({
      senderId,
      receiverId,
      content,
      subject,
      type,
      priority: type === MessageType.URGENT ? MessagePriority.HIGH : MessagePriority.NORMAL
    });

    const savedMessage = await this.messageRepository.save(message);

    // Create notification for receiver
    await this.createNotification(receiverId, {
      title: `Nou missatge${subject ? `: ${subject}` : ''}`,
      message: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
      type: NotificationType.MESSAGE,
      actionUrl: `/messages/${savedMessage.id}`,
      metadata: { messageId: savedMessage.id }
    });

    return savedMessage;
  }

  async getMessages(userId: number, limit: number = 50): Promise<Message[]> {
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

  async getUnreadMessages(userId: number): Promise<Message[]> {
    return await this.messageRepository.find({
      where: { receiverId: userId, isRead: false },
      order: { createdAt: 'DESC' },
      relations: ['sender']
    });
  }

  async markMessageAsRead(messageId: number, userId: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id: messageId, receiverId: userId }
    });

    if (message) {
      message.isRead = true;
      return await this.messageRepository.save(message);
    }

    return message;
  }

  async translateMessage(messageId: number, targetLanguage: string): Promise<Message> {
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

  async createNotification(userId: number, notificationData: {
    title: string;
    message: string;
    type: NotificationType;
    actionUrl?: string;
    metadata?: any;
  }): Promise<Notification> {
    const notification = this.notificationRepository.create({
      userId,
      ...notificationData
    });

    return await this.notificationRepository.save(notification);
  }

  async getUserNotifications(userId: number, limit: number = 20): Promise<Notification[]> {
    return await this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit
    });
  }

  async getUnreadNotifications(userId: number): Promise<Notification[]> {
    return await this.notificationRepository.find({
      where: { userId, isRead: false },
      order: { createdAt: 'DESC' }
    });
  }

  async markNotificationAsRead(notificationId: number, userId: number): Promise<Notification> {
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

  async markAllNotificationsAsRead(userId: number): Promise<void> {
    await this.notificationRepository.update(
      { userId, isRead: false },
      { isRead: true, readAt: new Date() }
    );
  }
} 