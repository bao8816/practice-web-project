import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Users } from '../../users/users.entity';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class UserSeeder implements Seeder {
    constructor(
        private readonly dataSource: DataSource,
        private readonly configService: ConfigService,
    ) {}

    public async run(): Promise<void> {
        const repository = this.dataSource.getRepository(Users);

        // Truncate the users table to clear all data and reset the ID counter
        await this.dataSource.query(`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`);

        // Add the Administrator user
        const salt = await bcrypt.genSalt();
        const adminHashedPassword = await bcrypt.hash(
            this.configService.get<string>('ADMIN_DEFAULT_PASSWORD', ''),
            salt,
        );

        const adminUser = repository.create({
            username: 'Administrator',
            password: adminHashedPassword,
            role: 'admin',
        });
        await repository.save(adminUser);
        console.log('✅ Created admin user: Administrator');

        // Add sample users for testing
        const sampleUsers = [
            { username: 'user1', password: '1' },
            { username: 'user2', password: '1' },
            { username: 'user3', password: '1' },
        ];

        for (const userData of sampleUsers) {
            const userSalt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(userData.password, userSalt);

            const user = repository.create({
                username: userData.username,
                password: hashedPassword,
                role: 'customer',
            });
            await repository.save(user);
            console.log(`✅ Created customer user: ${userData.username}`);
        }

        console.log('User seeding completed: 1 admin + 3 sample users');
    }
}
