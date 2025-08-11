import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Users } from './src/users/users.entity';
import { Profiles } from './src/profiles/profiles.entity';
import { Addresses } from './src/addresses/addresses.entity';

dotenv.config();

const configService = new ConfigService();

// Single DataSource export for TypeORM CLI
const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: [Users, Profiles, Addresses],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
    logging: false,
});

// Export configuration factory for NestJS (separate from CLI DataSource)
export const typeOrmConfigFactory = (configService: ConfigService) => ({
    type: 'postgres' as const,
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: [Users, Profiles, Addresses],
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
    logging: false,
});

export default AppDataSource;
