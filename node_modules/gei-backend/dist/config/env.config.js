"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfig = void 0;
class EnvConfig {
    constructor(configService) {
        this.configService = configService;
    }
    get app() {
        return {
            port: this.configService.get('PORT', 3001),
            nodeEnv: this.configService.get('NODE_ENV', 'development'),
            frontendUrl: this.configService.get('FRONTEND_URL', 'http://localhost:3000'),
            corsOrigin: this.configService.get('CORS_ORIGIN', 'http://localhost:3000'),
            corsCredentials: this.configService.get('CORS_CREDENTIALS', true),
        };
    }
    get database() {
        return {
            url: this.configService.get('DATABASE_URL'),
            host: this.configService.get('DATABASE_HOST', 'localhost'),
            port: this.configService.get('DATABASE_PORT', 5432),
            username: this.configService.get('DATABASE_USERNAME', 'postgres'),
            password: this.configService.get('DATABASE_PASSWORD', 'password'),
            database: this.configService.get('DATABASE_NAME', 'gei_db'),
            ssl: this.configService.get('DATABASE_SSL', false),
        };
    }
    get redis() {
        return {
            url: this.configService.get('REDIS_URL', 'redis://localhost:6379'),
            host: this.configService.get('REDIS_HOST', 'localhost'),
            port: this.configService.get('REDIS_PORT', 6379),
            tls: this.configService.get('REDIS_TLS', false),
        };
    }
    get jwt() {
        return {
            secret: this.configService.get('JWT_SECRET', 'fallback-secret'),
            expiresIn: this.configService.get('JWT_EXPIRES_IN', '7d'),
            refreshSecret: this.configService.get('JWT_REFRESH_SECRET', 'fallback-refresh'),
            refreshExpiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '30d'),
        };
    }
    get google() {
        return {
            clientId: this.configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
            callbackUrl: this.configService.get('GOOGLE_CALLBACK_URL'),
        };
    }
    get gemini() {
        return {
            apiKey: this.configService.get('GEMINI_API_KEY'),
            model: this.configService.get('GEMINI_MODEL', 'gemini-pro'),
        };
    }
    get mail() {
        return {
            host: this.configService.get('MAIL_HOST', 'smtp.gmail.com'),
            port: this.configService.get('MAIL_PORT', 587),
            user: this.configService.get('MAIL_USER'),
            pass: this.configService.get('MAIL_PASS'),
            from: this.configService.get('MAIL_FROM', 'noreply@gei-adeptify.com'),
        };
    }
    get twilio() {
        return {
            accountSid: this.configService.get('TWILIO_ACCOUNT_SID'),
            authToken: this.configService.get('TWILIO_AUTH_TOKEN'),
            phoneNumber: this.configService.get('TWILIO_PHONE_NUMBER'),
        };
    }
    get isDevelopment() {
        return this.app.nodeEnv === 'development';
    }
    get isProduction() {
        return this.app.nodeEnv === 'production';
    }
    get logLevel() {
        return this.configService.get('LOG_LEVEL', 'info');
    }
    get enableSwagger() {
        return this.configService.get('ENABLE_SWAGGER', this.isDevelopment);
    }
}
exports.EnvConfig = EnvConfig;
//# sourceMappingURL=env.config.js.map