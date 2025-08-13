import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfilesModule } from './profiles/profiles.module';
import { typeOrmConfigFactory } from '../typeorm.config';
import { AddressesModule } from './addresses/addresses.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: typeOrmConfigFactory,
        }),
        UsersModule,
        AuthModule,
        ProfilesModule,
        AddressesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
