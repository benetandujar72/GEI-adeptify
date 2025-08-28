"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
dotenv.config();
const configService = new config_1.ConfigService();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'gei_db',
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
    entities: [__dirname + '/modules/**/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
});
//# sourceMappingURL=data-source.js.map