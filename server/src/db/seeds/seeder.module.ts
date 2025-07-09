import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserSeeder from './user.seeder';
import ProfileSeeder from './profile.seeder';
import AddressSeeder from './address.seeder';
import { Users } from '../../users/users.entity';
import { Profile } from '../../profiles/profiles.entity';
import { Addresses } from '../../addresses/addresses.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                entities: [Users, Profile, Addresses],
                autoLoadEntities: true,
                synchronize: false,
            }),
        }),
        TypeOrmModule.forFeature([Users, Profile, Addresses]),
    ],
    providers: [UserSeeder, ProfileSeeder, AddressSeeder],
})
export class SeederModule {}
