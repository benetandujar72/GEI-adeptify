"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
const compression_1 = require("compression");
const express_rate_limit_1 = require("express-rate-limit");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.use((0, express_rate_limit_1.default)({
        windowMs: configService.get('RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
        max: configService.get('RATE_LIMIT_MAX_REQUESTS', 100),
        message: {
            error: 'Massa peticions. Si us plau, torna-ho a provar més tard.',
        },
    }));
    const corsOrigin = configService.get('CORS_ORIGIN', 'http://localhost:3000');
    app.enableCors({
        origin: corsOrigin,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('GEI - Gestor Escolar Intel·ligent')
        .setDescription('API del sistema de gestió escolar revolucionari')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Autenticació', 'Endpoints per a autenticació i autorització')
        .addTag('Usuaris', 'Gestió d\'usuaris i perfils')
        .addTag('Recursos', 'Gestió d\'espais i recursos escolars')
        .addTag('Reserves', 'Sistema de reserves amb IA')
        .addTag('Comunicacions', 'Hub de comunicació familiar')
        .addTag('Acadèmic', 'Gestió acadèmica i avaluacions')
        .addTag('Analytics', 'Analytics educatius avançats')
        .addTag('Gamificació', 'Sistema de gamificació educativa')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.use('/health', (req, res) => {
        res.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: configService.get('NODE_ENV'),
        });
    });
    const port = configService.get('PORT', 3001);
    await app.listen(port);
    console.log(`🚀 GEI Backend executant-se al port ${port}`);
    console.log(`📚 Documentació API disponible a: http://localhost:${port}/api/docs`);
    console.log(`🏥 Health check disponible a: http://localhost:${port}/health`);
}
bootstrap().catch((error) => {
    console.error('❌ Error iniciant l\'aplicació:', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map