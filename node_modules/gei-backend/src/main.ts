import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configuració de seguretat
  app.use(helmet());
  app.use(compression());

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: configService.get('RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000), // 15 minuts
      max: configService.get('RATE_LIMIT_MAX_REQUESTS', 100), // límit per IP
      message: {
        error: 'Massa peticions. Si us plau, torna-ho a provar més tard.',
      },
    }),
  );

  // CORS
  const corsOrigin = configService.get('CORS_ORIGIN', 'http://localhost:3000');
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  // Validació global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Prefix global per a l'API
  app.setGlobalPrefix('api');

  // Configuració de Swagger
  const config = new DocumentBuilder()
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Health check endpoint
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