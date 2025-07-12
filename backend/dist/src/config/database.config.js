"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceConfig = exports.databaseConfig = void 0;
const databaseConfig = (configService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST') || 'localhost',
    port: configService.get('DB_PORT') || 5432,
    username: configService.get('DB_USERNAME') || 'postgres',
    password: configService.get('DB_PASSWORD') || 'password',
    database: configService.get('DB_NAME') || 'gei_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    synchronize: configService.get('NODE_ENV') === 'development',
    logging: configService.get('NODE_ENV') === 'development',
    ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
    autoLoadEntities: true,
    keepConnectionAlive: true,
});
exports.databaseConfig = databaseConfig;
const dataSourceConfig = (configService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST') || 'localhost',
    port: configService.get('DB_PORT') || 5432,
    username: configService.get('DB_USERNAME') || 'postgres',
    password: configService.get('DB_PASSWORD') || 'password',
    database: configService.get('DB_NAME') || 'gei_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    synchronize: configService.get('NODE_ENV') === 'development',
    logging: configService.get('NODE_ENV') === 'development',
    ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
});
exports.dataSourceConfig = dataSourceConfig;
//# sourceMappingURL=database.config.js.map