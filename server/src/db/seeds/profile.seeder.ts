import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Profile } from '../../profiles/profiles.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ProfileSeeder implements Seeder {
    constructor(private readonly dataSource: DataSource) {}

    public async run(): Promise<void> {
        const repository = this.dataSource.getRepository(Profile);

        // Truncate the profiles table to clear all data and reset the ID counter
        await this.dataSource.query(`TRUNCATE TABLE "profiles" RESTART IDENTITY CASCADE;`);

        // Create a profile for the admin user (assuming admin has userId = 1)
        const adminProfile = repository.create({
            userId: 1,
            fullName: 'System Administrator',
            phoneNumber: '+1234567890',
            avatarUrl: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
        });
        await repository.save(adminProfile);

        console.log('Profile seeding completed');
    }
}
