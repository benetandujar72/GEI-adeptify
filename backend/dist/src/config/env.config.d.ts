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
export declare class EnvConfig {
    private configService;
    constructor(configService: ConfigService);
    get app(): AppConfig;
    get database(): DatabaseConfig;
    get redis(): RedisConfig;
    get jwt(): JwtConfig;
    get google(): GoogleConfig;
    get gemini(): GeminiConfig;
    get mail(): MailConfig;
    get twilio(): TwilioConfig;
    get isDevelopment(): boolean;
    get isProduction(): boolean;
    get logLevel(): string;
    get enableSwagger(): boolean;
}
