import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeds/seeder.module';
import UserSeeder from './seeds/user.seeder';
import ProfileSeeder from './seeds/profile.seeder';
import AddressSeeder from './seeds/address.seeder';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(SeederModule);

    try {
        console.log('🌱 Starting database seeding...');

        // Run seeders in order - first users, then profiles, then addresses
        const userSeeder = app.get(UserSeeder);
        console.log('Seeding users...');
        await userSeeder.run();

        const profileSeeder = app.get(ProfileSeeder);
        console.log('Seeding profiles...');
        await profileSeeder.run();

        const addressSeeder = app.get(AddressSeeder);
        console.log('Seeding addresses...');
        await addressSeeder.run();

        console.log('✅ Database seeding completed successfully!');
    } catch (error) {
        console.error('❌ Database seeding failed!');
        console.error(error);
    } finally {
        await app.close();
    }
}

void bootstrap();
