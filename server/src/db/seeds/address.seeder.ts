import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Addresses } from '../../addresses/addresses.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class AddressSeeder implements Seeder {
    constructor(private readonly dataSource: DataSource) {}

    public async run(): Promise<void> {
        const repository = this.dataSource.getRepository(Addresses);

        // Truncate the addresses table to clear all data and reset the ID counter
        await this.dataSource.query(`TRUNCATE TABLE "addresses" RESTART IDENTITY CASCADE;`);

        // Create a default address for the admin user (assuming admin has userId = 1)
        const adminAddress = repository.create({
            userId: 1,
            name: 'Main Office',
            recipientName: 'System Administrator',
            streetAddress: '123 Admin Street',
            city: 'Admin City',
            state: 'Admin State',
            postalCode: '12345',
            country: 'United States',
            phoneNumber: '+1234567890',
            isDefaultShipping: true,
            isDefaultBilling: true,
        });
        await repository.save(adminAddress);

        console.log('Address seeding completed');
    }
}
