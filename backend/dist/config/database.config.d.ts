import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export declare const getDatabaseConfig: (configService: ConfigService) => TypeOrmModuleOptions;
export declare const databaseConfig: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    migrations: string[];
    synchronize: boolean;
    logging: boolean;
    ssl: boolean | {
        rejectUnauthorized: boolean;
    };
    autoLoadEntities: boolean;
    keepConnectionAlive: boolean;
};
