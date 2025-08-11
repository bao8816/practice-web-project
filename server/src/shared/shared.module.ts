import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationService } from './services/validation.service';
import { Users } from '../users/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [ValidationService],
    exports: [ValidationService],
})
export class SharedModule {}
