import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addresses } from './addresses.entity';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [TypeOrmModule.forFeature([Addresses]), SharedModule],
    controllers: [AddressesController],
    providers: [AddressesService],
    exports: [AddressesService],
})
export class AddressesModule {}
