import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profiles } from './profiles.entity';
import { AppException } from '../shared/exceptions/exceptions';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { ValidationService } from '../shared/services/validation.service';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profiles)
        private profilesRepository: Repository<Profiles>,
        private validationService: ValidationService,
    ) {}

    private canAccessProfile(requestingUserId: number, targetUserId: number, userRole: string): boolean {
        return requestingUserId === targetUserId || userRole === 'admin';
    }

    private validateProfileAccess(
        requestingUserId: number,
        targetUserId: number,
        userRole: string,
        action: string,
    ): void {
        if (!this.canAccessProfile(requestingUserId, targetUserId, userRole)) {
            throw AppException.Forbidden(`You don't have permission to ${action} this profile`);
        }
    }

    async findAll(): Promise<Profiles[]> {
        const profiles = await this.profilesRepository.find();
        if (!profiles || profiles.length === 0) {
            throw AppException.NotFound('No profiles found');
        }
        return profiles;
    }

    async findProfileByUserId(userId: number): Promise<Profiles> {
        // Validate user exists first using ValidationService
        await this.validationService.validateUserExists(userId);

        const profile = await this.profilesRepository.findOne({
            where: { userId },
        });

        if (!profile) {
            throw AppException.NotFound(`Profile not found for user ${userId}`);
        }

        return profile;
    }

    async createProfile(userId: number, createProfileDto?: CreateProfileDto): Promise<Profiles> {
        // Validate user exists using ValidationService
        await this.validationService.validateUserExists(userId);

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

    async updateProfile(
        userId: number,
        updateProfileDto: UpdateProfileDto,
        requestingUserId?: number,
        userRole?: string,
    ): Promise<Profiles> {
        // Validate user exists first using ValidationService
        await this.validationService.validateUserExists(userId);

        if (requestingUserId !== undefined && userRole !== undefined) {
            this.validateProfileAccess(requestingUserId, userId, userRole, 'update');
        }

        const profile = await this.profilesRepository.findOne({
            where: { userId },
        });

        if (!profile) {
            throw AppException.NotFound(`Profile not found for user ${userId}`);
        }

        // Update profile with provided data
        const updatedProfile = Object.assign(profile, updateProfileDto);

        return this.profilesRepository.save(updatedProfile);
    }

    async deleteProfile(userId: number, requestingUserId?: number, userRole?: string): Promise<void> {
        // Validate user exists first using ValidationService
        await this.validationService.validateUserExists(userId);

        if (requestingUserId !== undefined && userRole !== undefined) {
            this.validateProfileAccess(requestingUserId, userId, userRole, 'delete');
        }

        const profile = await this.profilesRepository.findOne({
            where: { userId },
        });

        if (!profile) {
            throw AppException.NotFound(`Profile not found for user ${userId}`);
        }

        await this.profilesRepository.remove(profile);
    }
}
