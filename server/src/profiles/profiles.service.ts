import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profiles } from './profiles.entity';
import { AppException } from '../shared/exceptions/exceptions';
import { CreateProfileDto, UpdateProfileDto } from './dto';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profiles)
        private profilesRepository: Repository<Profiles>,
    ) {}

    async findAll(): Promise<Profiles[]> {
        const profiles = await this.profilesRepository.find();
        if (!profiles || profiles.length === 0) {
            throw AppException.NotFound('No profiles found');
        }
        return profiles;
    }

    async findProfileByUserId(userId: number): Promise<Profiles> {
        const profile = await this.profilesRepository.findOne({
            where: { userId },
        });

        if (!profile) {
            throw AppException.NotFound(`Profile not found for user ${userId}`);
        }

        return profile;
    }

    async createProfile(userId: number, createProfileDto?: CreateProfileDto): Promise<Profiles> {
        // Check if profile already exists
        const existingProfile = await this.profilesRepository.findOne({
            where: { userId },
        });

        if (existingProfile) {
            throw AppException.BadRequest(`Profile for user ${userId} already exists`);
        }

        // Create empty profile or with provided data
        const profile = this.profilesRepository.create({
            userId,
            ...createProfileDto,
        });

        return this.profilesRepository.save(profile);
    }

    async updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<Profiles> {
        const profile = await this.findProfileByUserId(userId);

        // Update profile with provided data
        const updatedProfile = Object.assign(profile, updateProfileDto);

        return this.profilesRepository.save(updatedProfile);
    }

    async deleteProfile(userId: number): Promise<void> {
        const profile = await this.findProfileByUserId(userId);
        await this.profilesRepository.remove(profile);
    }
}
