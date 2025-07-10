import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Users } from './users/users.entity';
import { Profiles } from './profiles/profiles.entity';
import { ProfilesModule } from './profiles/profiles.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
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
                entities: [Users, Profiles],
                synchronize: false, // Be careful with this in production! -> change to false
                namingStrategy: new SnakeNamingStrategy(),
            }),
        }),
        UsersModule,
        AuthModule,
        ProfilesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
