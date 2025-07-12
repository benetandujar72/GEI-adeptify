
import { ConfigService } from '@nestjs/config';

export interface DatabaseConfig {
  url: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
}

export interface RedisConfig {
  url: string;
  host: string;
  port: number;
  tls: boolean;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

export interface GoogleConfig {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
}

export interface GeminiConfig {
  apiKey: string;
  model: string;
}

export interface MailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}

export interface AppConfig {
  port: number;
  nodeEnv: string;
  frontendUrl: string;
  corsOrigin: string;
  corsCredentials: boolean;
}

export class EnvConfig {
  constructor(private configService: ConfigService) {}

  get app(): AppConfig {
    return {
      port: this.configService.get<number>('PORT', 3001),
      nodeEnv: this.configService.get<string>('NODE_ENV', 'development'),
      frontendUrl: this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000'),
      corsOrigin: this.configService.get<string>('CORS_ORIGIN', 'http://localhost:3000'),
      corsCredentials: this.configService.get<boolean>('CORS_CREDENTIALS', true),
    };
  }

  get database(): DatabaseConfig {
    return {
      url: this.configService.get<string>('DATABASE_URL'),
      host: this.configService.get<string>('DATABASE_HOST', 'localhost'),
      port: this.configService.get<number>('DATABASE_PORT', 5432),
      username: this.configService.get<string>('DATABASE_USERNAME', 'postgres'),
      password: this.configService.get<string>('DATABASE_PASSWORD', 'password'),
      database: this.configService.get<string>('DATABASE_NAME', 'gei_db'),
      ssl: this.configService.get<boolean>('DATABASE_SSL', false),
    };
  }

  get redis(): RedisConfig {
    return {
      url: this.configService.get<string>('REDIS_URL', 'redis://localhost:6379'),
      host: this.configService.get<string>('REDIS_HOST', 'localhost'),
      port: this.configService.get<number>('REDIS_PORT', 6379),
      tls: this.configService.get<boolean>('REDIS_TLS', false),
    };
  }

  get jwt(): JwtConfig {
    return {
      secret: this.configService.get<string>('JWT_SECRET', 'fallback-secret'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '7d'),
      refreshSecret: this.configService.get<string>('JWT_REFRESH_SECRET', 'fallback-refresh'),
      refreshExpiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '30d'),
    };
  }

  get google(): GoogleConfig {
    return {
      clientId: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackUrl: this.configService.get<string>('GOOGLE_CALLBACK_URL'),
    };
  }

  get gemini(): GeminiConfig {
    return {
      apiKey: this.configService.get<string>('GEMINI_API_KEY'),
      model: this.configService.get<string>('GEMINI_MODEL', 'gemini-pro'),
    };
  }

  get mail(): MailConfig {
    return {
      host: this.configService.get<string>('MAIL_HOST', 'smtp.gmail.com'),
      port: this.configService.get<number>('MAIL_PORT', 587),
      user: this.configService.get<string>('MAIL_USER'),
      pass: this.configService.get<string>('MAIL_PASS'),
      from: this.configService.get<string>('MAIL_FROM', 'noreply@gei-adeptify.com'),
    };
  }

  get twilio(): TwilioConfig {
    return {
      accountSid: this.configService.get<string>('TWILIO_ACCOUNT_SID'),
      authToken: this.configService.get<string>('TWILIO_AUTH_TOKEN'),
      phoneNumber: this.configService.get<string>('TWILIO_PHONE_NUMBER'),
    };
  }

  get isDevelopment(): boolean {
    return this.app.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.app.nodeEnv === 'production';
  }

  get logLevel(): string {
    return this.configService.get<string>('LOG_LEVEL', 'info');
  }

  get enableSwagger(): boolean {
    return this.configService.get<boolean>('ENABLE_SWAGGER', this.isDevelopment);
  }
}
