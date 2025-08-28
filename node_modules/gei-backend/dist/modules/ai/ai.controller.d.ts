import { AiService } from './ai.service';
import { ChatDto } from './dto/chat.dto';
import { TranslateDto } from './dto/translate.dto';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    chat(chatDto: ChatDto, req: any): Promise<{
        response: string;
        timestamp: string;
        messageId: string;
    }>;
    translate(translateDto: TranslateDto): Promise<{
        originalText: string;
        translatedText: string;
        targetLanguage: string;
        timestamp: string;
    }>;
    getCapabilities(): Promise<{
        capabilities: {
            name: string;
            description: string;
            examples: string[];
        }[];
        languages: string[];
        timestamp: string;
    }>;
}
