import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatDto } from './dto/chat.dto';
import { TranslateDto } from './dto/translate.dto';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body() chatDto: ChatDto, @Request() req) {
    const response = await this.aiService.processNaturalLanguageRequest(
      chatDto.message,
      req.user.id
    );
    
    return {
      response,
      timestamp: new Date().toISOString(),
      messageId: chatDto.messageId
    };
  }

  @Post('translate')
  async translate(@Body() translateDto: TranslateDto) {
    const translatedText = await this.aiService.translateMessage(
      translateDto.text,
      translateDto.targetLanguage
    );
    
    return {
      originalText: translateDto.text,
      translatedText,
      targetLanguage: translateDto.targetLanguage,
      timestamp: new Date().toISOString()
    };
  }

  @Get('capabilities')
  async getCapabilities() {
    return {
      capabilities: [
        {
          name: 'reservations',
          description: 'Fer reserves d\'espais amb llenguatge natural',
          examples: [
            'Vull reservar la biblioteca el dilluns a les 9:00',
            'Necessito la sala d\'actes per a demà'
          ]
        },
        {
          name: 'availability',
          description: 'Consultar disponibilitat d\'espais',
          examples: [
            'Està lliure la biblioteca?',
            'Quan està disponible la sala d\'actes?'
          ]
        },
        {
          name: 'academic',
          description: 'Consultar progrés acadèmic',
          examples: [
            'Com van les meves notes?',
            'Quin és el meu progrés acadèmic?'
          ]
        },
        {
          name: 'general',
          description: 'Preguntes generals sobre l\'escola',
          examples: [
            'Quin és l\'horari de l\'escola?',
            'Com puc contactar amb el professor?'
          ]
        }
      ],
      languages: ['ca', 'es', 'en'],
      timestamp: new Date().toISOString()
    };
  }
} 