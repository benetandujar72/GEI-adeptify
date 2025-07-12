import { Controller, Get, Post, Body, Param, UseGuards, Request, Patch } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessageType } from './entities/message.entity';

@Controller('communications')
@UseGuards(JwtAuthGuard)
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) {}

  @Post('messages')
  async sendMessage(@Request() req, @Body() body: {
    receiverId: number;
    content: string;
    subject?: string;
    type?: MessageType;
  }) {
    return await this.communicationsService.sendMessage(
      req.user.id,
      body.receiverId,
      body.content,
      body.subject,
      body.type
    );
  }

  @Get('messages')
  async getMessages(@Request() req, @Body() body: { limit?: number }) {
    return await this.communicationsService.getMessages(req.user.id, body.limit);
  }

  @Get('messages/unread')
  async getUnreadMessages(@Request() req) {
    return await this.communicationsService.getUnreadMessages(req.user.id);
  }

  @Patch('messages/:id/read')
  async markMessageAsRead(@Param('id') id: string, @Request() req) {
    return await this.communicationsService.markMessageAsRead(+id, req.user.id);
  }

  @Post('messages/:id/translate')
  async translateMessage(@Param('id') id: string, @Body() body: { targetLanguage: string }) {
    return await this.communicationsService.translateMessage(+id, body.targetLanguage);
  }

  @Get('notifications')
  async getNotifications(@Request() req, @Body() body: { limit?: number }) {
    return await this.communicationsService.getUserNotifications(req.user.id, body.limit);
  }

  @Get('notifications/unread')
  async getUnreadNotifications(@Request() req) {
    return await this.communicationsService.getUnreadNotifications(req.user.id);
  }

  @Patch('notifications/:id/read')
  async markNotificationAsRead(@Param('id') id: string, @Request() req) {
    return await this.communicationsService.markNotificationAsRead(+id, req.user.id);
  }

  @Patch('notifications/read-all')
  async markAllNotificationsAsRead(@Request() req) {
    return await this.communicationsService.markAllNotificationsAsRead(req.user.id);
  }
} 