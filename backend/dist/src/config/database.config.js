"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const env_config_1 = require("./env.config");
const user_entity_1 = require("../modules/users/entities/user.entity");
const school_entity_1 = require("../modules/schools/entities/school.entity");
const resource_entity_1 = require("../modules/resources/entities/resource.entity");
const reservation_entity_1 = require("../modules/reservations/entities/reservation.entity");
const message_entity_1 = require("../modules/communications/entities/message.entity");
const notification_entity_1 = require("../modules/communications/entities/notification.entity");
const academic_progress_entity_1 = require("../modules/academic/entities/academic-progress.entity");
const gamification_points_entity_1 = require("../modules/gamification/entities/gamification-points.entity");
const databaseConfig = (configService) => {
    const envConfig = new env_config_1.EnvConfig(configService);
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
            user_entity_1.User,
            school_entity_1.School,
            resource_entity_1.Resource,
            reservation_entity_1.Reservation,
            message_entity_1.Message,
            notification_entity_1.Notification,
            academic_progress_entity_1.AcademicProgress,
            gamification_points_entity_1.GamificationPoints,
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
            duration: 30000,
        },
        extra: {
            connectionLimit: 10,
            acquireTimeout: 60000,
            timeout: 60000,
        },
    };
};
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.config.js.map