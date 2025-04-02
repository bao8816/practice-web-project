import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || configService.get<string>('DATABASE_HOST', 'localhost'),
    port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT)
        : configService.get<number>('DATABASE_PORT', 5432),
    username: process.env.DATABASE_USER || configService.get<string>('DATABASE_USER', 'postgres'),
    password: process.env.DATABASE_PASSWORD || configService.get<string>('DATABASE_PASSWORD', 'ltpbao'),
    database: process.env.DATABASE_NAME || configService.get<string>('DATABASE_NAME', 'ecommerce_project_db'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/**/*.js'],
    seeds: ['dist/db/seeds/**/*.js'],
};

export const AppDataSource = new DataSource(dataSourceOptions);
