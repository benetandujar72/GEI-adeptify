import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
export declare const databaseConfig: (configService: ConfigService) => TypeOrmModuleOptions;
export declare const dataSourceConfig: (configService: ConfigService) => DataSourceOptions;
