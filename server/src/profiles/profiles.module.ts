import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { Profiles } from './profiles.entity';
import { ProfilesController } from './profiles.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Profiles])],
    controllers: [ProfilesController],
    providers: [ProfilesService],
    exports: [ProfilesService],
})
export class ProfilesModule {}
