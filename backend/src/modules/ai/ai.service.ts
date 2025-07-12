import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { User } from '../users/entities/user.entity';
import { Resource } from '../resources/entities/resource.entity';
import { Reservation, ReservationStatus } from '../reservations/entities/reservation.entity';
import { AcademicProgress } from '../academic/entities/academic-progress.entity';
import { Message } from '../communications/entities/message.entity';
import { Notification } from '../communications/entities/notification.entity';
import { GamificationPoints } from '../gamification/entities/gamification-points.entity';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private genAI: GoogleGenerativeAI;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(AcademicProgress)
    private academicProgressRepository: Repository<AcademicProgress>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(GamificationPoints)
    private gamificationPointsRepository: Repository<GamificationPoints>,
  ) {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async processNaturalLanguageRequest(message: string, userId: string): Promise<string> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return "Ho sento, no he pogut trobar el teu perfil d'usuari.";
      }

      // Get user's school resources for context
      const resources = await this.resourceRepository.find({
        where: { schoolId: parseInt(user.schoolId.toString()) }
      });
      
      // Analyze the message intent
      const intent = await this.analyzeIntent(message, user, resources);
      
      // Process based on intent
      switch (intent.type) {
        case 'reservation':
          return await this.handleReservationRequest(intent, user, resources);
        case 'availability_query':
          return await this.handleAvailabilityQuery(intent, user, resources);
        case 'query':
          return await this.handleQueryRequest(intent, user);
        case 'greeting':
          return this.handleGreeting(user);
        case 'academic':
          return await this.handleAcademicRequest(intent, user);
        case 'help':
          return this.handleHelpRequest(intent, user);
        default:
          return await this.handleGenericRequest(message, user);
      }
    } catch (error) {
      this.logger.error("AI processing error:", error);
      return "Ho sento, hi ha hagut un error processant la teva petició. Si us plau, prova-ho de nou.";
    }
  }

  private async analyzeIntent(message: string, user: User, resources: Resource[]): Promise<any> {
    const messageLower = message.toLowerCase();
    
    // Quick pattern matching for common patterns
    if (messageLower.includes('reservar') || messageLower.includes('reserva') || 
        messageLower.includes('necessito') || messageLower.includes('vull')) {
      const resourceNames = resources.map(r => r.name.toLowerCase());
      const foundResource = resourceNames.find(name => messageLower.includes(name.toLowerCase()));
      
      const timePatterns = [
        /(dilluns|dimarts|dimecres|dijous|divendres|dissabte|diumenge)\s+\d{1,2}\s+de\s+\w+\s+a\s+les\s+\d{1,2}:\d{2}\s+fins\s+les\s+\d{1,2}:\d{2}/i,
        /\d{1,2}\s+de\s+\w+\s+a\s+les\s+\d{1,2}:\d{2}\s+fins\s+les\s+\d{1,2}:\d{2}/i,
        /a\s+les\s+\d{1,2}:\d{2}\s+fins\s+les\s+\d{1,2}:\d{2}/i,
        /de\s+\d{1,2}:\d{2}\s+a\s+\d{1,2}:\d{2}/i,
        /(\d{1,2}:\d{2}|\d{1,2}\s*h|demà|avui|dilluns|dimarts|dimecres|dijous|divendres|primera|segona)/i
      ];
      
      let timeMatch = null;
      for (const pattern of timePatterns) {
        timeMatch = message.match(pattern);
        if (timeMatch) break;
      }
      
      return {
        type: 'reservation',
        details: message,
        resource: foundResource || null,
        time: timeMatch ? timeMatch[0] : null
      };
    }
    
    // Check for availability queries
    if (messageLower.includes('lliure') || messageLower.includes('disponible') || 
        messageLower.includes('està lliure') || messageLower.includes('està disponible')) {
      const resourceNames = resources.map(r => r.name.toLowerCase());
      const foundResource = resourceNames.find(name => messageLower.includes(name.toLowerCase()));
      const timePattern = message.match(/(\d{1,2}:\d{2}|\d{1,2}\s*h|demà|avui|dilluns|dimarts|dimecres|dijous|divendres|proper|pròxim)/i);
      
      return {
        type: 'availability_query',
        details: message,
        resource: foundResource || null,
        time: timePattern ? timePattern[0] : null
      };
    }
    
    if (messageLower.includes('hola') || messageLower.includes('bon dia') || messageLower.includes('salut')) {
      return { type: 'greeting', details: message };
    }
    
    if (messageLower.includes('ajuda') || messageLower.includes('help')) {
      return { type: 'help', details: message };
    }
    
    if (messageLower.includes('notes') || messageLower.includes('progrés') || messageLower.includes('acadèmic')) {
      return { type: 'academic', details: message };
    }
    
    // Use AI for complex cases
    const systemPrompt = `Analitza: "${message}". Respon JSON: {"type": "tipus", "details": "${message}", "resource": "nom_si_aplica", "time": "hora_si_aplica"}
    
    Tipus: reservation, query, greeting, academic, help, generic`;

    const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const result = await model.generateContent(systemPrompt + "\n\n" + message);
    const response = await result.response;
    const text = response.text();

    try {
      return JSON.parse(text);
    } catch {
      return { type: 'generic', details: message };
    }
  }

  private async handleAvailabilityQuery(intent: any, user: User, resources: Resource[]): Promise<string> {
    try {
      let resource = null;
      if (intent.resource) {
        resource = resources.find(r => 
          r.name.toLowerCase().includes(intent.resource.toLowerCase()) || 
          intent.resource.toLowerCase().includes(r.name.toLowerCase())
        );
      } else {
        const messageLower = intent.details.toLowerCase();
        resource = resources.find(r => messageLower.includes(r.name.toLowerCase()));
      }

      if (!resource) {
        return "Ho sento, no he pogut identificar quin espai estàs consultant. Pots especificar el nom exacte? Els espais disponibles són: " + 
               resources.map(r => r.name).join(', ');
      }

      // Parse the time from the message
      const timeInfo = await this.parseTimeExpression(intent.time || intent.details);
      
      if (!timeInfo.startTime) {
        return `Per consultar la disponibilitat de ${resource.name}, necessito saber quin dia i hora. Per exemple: "Està lliure la biblioteca el dilluns a les 9:00?"`;
      }

      // Check availability in the database
      const conflictingReservations = await this.reservationRepository.find({
        where: {
          resourceId: resource.id,
          status: ReservationStatus.CONFIRMED,
          startTime: timeInfo.startTime,
          endTime: timeInfo.endTime || new Date(timeInfo.startTime.getTime() + 60 * 60 * 1000)
        }
      });

      if (conflictingReservations.length === 0) {
        return `✅ Sí, ${resource.name} està lliure ${this.formatDateTime(timeInfo.startTime)}. Vols fer una reserva?`;
      } else {
        const conflictInfo = conflictingReservations[0];
        return `❌ Ho sento, ${resource.name} ja està reservat ${this.formatDateTime(timeInfo.startTime)}. Hi ha una reserva de ${this.formatDateTime(conflictInfo.startTime)} a ${this.formatDateTime(conflictInfo.endTime)}.\n\nVols que busqui altres horaris disponibles?`;
      }
    } catch (error) {
      this.logger.error("Availability query error:", error);
      return "Ho sento, hi ha hagut un error consultant la disponibilitat.";
    }
  }

  private async handleReservationRequest(intent: any, user: User, resources: Resource[]): Promise<string> {
    try {
      let resource = null;
      if (intent.resource) {
        resource = resources.find(r => 
          r.name.toLowerCase().includes(intent.resource.toLowerCase()) || 
          intent.resource.toLowerCase().includes(r.name.toLowerCase())
        );
      } else {
        const messageLower = intent.details.toLowerCase();
        resource = resources.find(r => messageLower.includes(r.name.toLowerCase()));
      }

      if (!resource) {
        return "Ho sento, no he pogut identificar quin espai vols reservar. Els espais disponibles són: " + 
               resources.map(r => r.name).join(', ');
      }

      const timeInfo = await this.parseTimeExpression(intent.time || intent.details);
      
      if (!timeInfo.startTime) {
        return `Per fer una reserva de ${resource.name}, necessito saber quin dia i hora. Per exemple: "Vull reservar la biblioteca el dilluns a les 9:00 fins les 11:00"`;
      }

      // Check availability
      const conflictingReservations = await this.reservationRepository.find({
        where: {
          resourceId: resource.id,
          status: ReservationStatus.CONFIRMED,
          startTime: timeInfo.startTime,
          endTime: timeInfo.endTime || new Date(timeInfo.startTime.getTime() + 60 * 60 * 1000)
        }
      });

      if (conflictingReservations.length > 0) {
        const conflictInfo = conflictingReservations[0];
        return `❌ Ho sento, ${resource.name} ja està reservat ${this.formatDateTime(timeInfo.startTime)}. Hi ha una reserva de ${this.formatDateTime(conflictInfo.startTime)} a ${this.formatDateTime(conflictInfo.endTime)}.\n\nVols que busqui altres horaris disponibles?`;
      }

      // Create reservation
      const reservation = this.reservationRepository.create({
        resourceId: resource.id,
        userId: user.id,
        schoolId: user.schoolId.toString(),
        title: `Reserva de ${resource.name}`,
        description: `Reserva feta via IA: ${intent.details}`,
        startTime: timeInfo.startTime,
        endTime: timeInfo.endTime || new Date(timeInfo.startTime.getTime() + 60 * 60 * 1000),
        status: ReservationStatus.PENDING,
        type: 'personal' as any
      });

      await this.reservationRepository.save(reservation);

      return `✅ Perfecte! He creat una reserva per a ${resource.name} ${this.formatDateTime(timeInfo.startTime)}. La reserva està pendent de confirmació.`;
    } catch (error) {
      this.logger.error("Reservation request error:", error);
      return "Ho sento, hi ha hagut un error creant la reserva.";
    }
  }

  private async handleQueryRequest(intent: any, user: User): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const prompt = `Ets un assistent educatiu. Respon a la següent pregunta de manera útil i educativa: ${intent.details}`;
    
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      this.logger.error("Query request error:", error);
      return "Ho sento, no he pogut processar la teva pregunta. Si us plau, prova-ho de nou.";
    }
  }

  private handleGreeting(user: User): string {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) {
      greeting = 'Bon dia';
    } else if (hour < 18) {
      greeting = 'Bona tarda';
    } else {
      greeting = 'Bona nit';
    }
    
    return `${greeting}, ${user.firstName}! Com puc ajudar-te avui?`;
  }

  private async handleAcademicRequest(intent: any, user: User): Promise<string> {
    if (user.role !== 'student') {
      return "Aquesta funcionalitat està disponible només per a estudiants.";
    }

    try {
      const academicProgress = await this.academicProgressRepository.find({
        where: { studentId: parseInt(user.id) },
        order: { date: 'DESC' },
        take: 10
      });

      if (academicProgress.length === 0) {
        return "Encara no tens registres acadèmics. Contacta amb el teu professor per a més informació.";
      }

      const averageScore = academicProgress.reduce((sum, progress) => sum + progress.percentage, 0) / academicProgress.length;
      
      return `El teu progrés acadèmic:\n\n📊 Mitjana general: ${averageScore.toFixed(1)}%\n📚 Últimes avaluacions: ${academicProgress.length}\n\nVols veure més detalls sobre alguna assignatura específica?`;
    } catch (error) {
      this.logger.error("Academic request error:", error);
      return "Ho sento, hi ha hagut un error accedint a la teva informació acadèmica.";
    }
  }

  private handleHelpRequest(intent: any, user: User): string {
    return `Hola ${user.firstName}! Aquí tens les coses que puc fer per tu:

🎯 **Reserves d'espais**: "Vull reservar la biblioteca el dilluns a les 9:00"
📅 **Consultar disponibilitat**: "Està lliure la sala d'actes?"
📚 **Progrés acadèmic**: "Com van les meves notes?"
❓ **Preguntes generals**: Qualsevol pregunta sobre l'escola

Pots parlar amb mi en català, castellà o anglès. Què necessites?`;
  }

  private async handleGenericRequest(message: string, user: User): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const prompt = `Ets un assistent educatiu amigable. Respon a: "${message}" de manera útil i en català.`;
    
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      this.logger.error("Generic request error:", error);
      return "Ho sento, no he pogut entendre la teva petició. Pots reformular-la o demanar ajuda amb 'ajuda'?";
    }
  }

  async translateMessage(message: string, targetLanguage: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const prompt = `Traduïu el següent text a ${targetLanguage}: "${message}"`;
    
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      this.logger.error("Translation error:", error);
      return message; // Return original if translation fails
    }
  }

  private async parseTimeExpression(timeExpression: string): Promise<any> {
    // This is a simplified version - in production you'd want a more robust time parser
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Simple patterns
    if (timeExpression.includes('demà')) {
      return { startTime: tomorrow };
    }
    
    if (timeExpression.includes('avui')) {
      return { startTime: now };
    }
    
    // Default to tomorrow at 9:00 AM
    const defaultTime = new Date(tomorrow);
    defaultTime.setHours(9, 0, 0, 0);
    
    return { startTime: defaultTime };
  }

  private formatDateTime(date: Date): string {
    return date.toLocaleString('ca-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
} 