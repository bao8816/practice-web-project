import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Profiles } from '../../profiles/profiles.entity';
import { Injectable } from '@nestjs/common';
import { ImageService } from '../../shared/services/image.service';

@Injectable()
export default class ProfileSeeder implements Seeder {
    constructor(private readonly dataSource: DataSource) {}

    public async run(): Promise<void> {
        const repository = this.dataSource.getRepository(Profiles);

        // Truncate the profiles table to clear all data and reset the ID counter
        await this.dataSource.query(`TRUNCATE TABLE "profiles" RESTART IDENTITY CASCADE;`);

        // Create a profile for the admin user (userId = 1)
        const adminProfile = repository.create({
            userId: 1,
            fullName: 'System Administrator',
            phoneNumber: '+1234567890',
            avatarUrl: ImageService.generateAvatarUrl('System Administrator', undefined, 'LARGE'),
        });
        await repository.save(adminProfile);
        console.log('✅ Created admin profile: System Administrator (userId: 1)');

        // Create profiles for sample users (userId = 2, 3, 4)
        const sampleProfiles = [
            {
                userId: 2, // user1
                fullName: 'John Smith',
                phoneNumber: '+84901234567',
                avatarUrl: ImageService.generateAvatarUrl('John Smith', 'male', 'MEDIUM'),
            },
            {
                userId: 3, // user2
                fullName: 'Emily Johnson',
                phoneNumber: '+84901234568',
                avatarUrl: ImageService.generateAvatarUrl('Emily Johnson', 'female', 'MEDIUM'),
            },
            {
                userId: 4, // user3
                fullName: 'Michael Brown',
                phoneNumber: '+84901234569',
                avatarUrl: ImageService.generateAvatarUrl('Michael Brown', 'male', 'MEDIUM'),
            },
        ];

        for (const profileData of sampleProfiles) {
            const profile = repository.create(profileData);
            await repository.save(profile);
            console.log(`✅ Created profile: ${profileData.fullName} (userId: ${profileData.userId})`);
        }

        console.log('Profile seeding completed: 1 admin + 3 sample user profiles with English names');
    }
}
