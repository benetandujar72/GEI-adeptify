import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { CommunicationsModule } from './modules/communications/communications.module';
import { AcademicModule } from './modules/academic/academic.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    // Configuració
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Base de dades
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USERNAME', 'postgres'),
        password: configService.get('DATABASE_PASSWORD', 'password'),
        database: configService.get('DATABASE_NAME', 'gei_db'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
        ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
        autoLoadEntities: true,
        keepConnectionAlive: true,
      }),
      inject: [ConfigService],
    }),

    // Mòduls de l'aplicació
    AuthModule,
    UsersModule,
    SchoolsModule,
    ResourcesModule,
    ReservationsModule,
    CommunicationsModule,
    AcademicModule,
    AnalyticsModule,
    GamificationModule,
    AiModule,
  ],
})
export class AppModule {} 