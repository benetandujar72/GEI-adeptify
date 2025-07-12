import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './env.config';
import { User } from '../modules/users/entities/user.entity';
import { School } from '../modules/schools/entities/school.entity';
import { Resource } from '../modules/resources/entities/resource.entity';
import { Reservation } from '../modules/reservations/entities/reservation.entity';
import { Message } from '../modules/communications/entities/message.entity';
import { Notification } from '../modules/communications/entities/notification.entity';
import { AcademicProgress } from '../modules/academic/entities/academic-progress.entity';
import { GamificationPoints } from '../modules/gamification/entities/gamification-points.entity';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const envConfig = new EnvConfig(configService);
  const dbConfig = envConfig.database;

  return {
    type: 'postgres',
    url: dbConfig.url,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [
      User,
      School,
      Resource,
      Reservation,
      Message,
      Notification,
      AcademicProgress,
      GamificationPoints,
    ],
    synchronize: envConfig.isDevelopment,
    logging: envConfig.isDevelopment ? ['query', 'error'] : ['error'],
    migrations: ['dist/migrations/*.js'],
    migrationsTableName: 'gei_migrations',
    migrationsRun: false,
    ssl: dbConfig.ssl ? { rejectUnauthorized: false } : false,
    cache: {
      type: 'redis',
      options: envConfig.redis,
      duration: 30000, // 30 seconds
    },
    extra: {
      connectionLimit: 10,
      acquireTimeout: 60000,
      timeout: 60000,
    },
  };
};