import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    providers: [ConfigService],
})
export class DataSourceModule {}

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/**/*.js'],
    seeds: ['dist/db/seeds/**/*.js'],
};

export const AppDataSource = new DataSource(dataSourceOptions);
