import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Users } from '../../users/users.entity';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserSeeder implements Seeder {
    constructor(private readonly dataSource: DataSource) {}

    public async run(): Promise<void> {
        const repository = this.dataSource.getRepository(Users);

        // Truncate the users table to clear all data and reset the ID counter
        await this.dataSource.query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`);

        // Add the Administrator user
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash('123', salt);

        const user = repository.create({
            username: 'Administrator',
            password: hashedPassword,
            role: 'admin',
        });
        await repository.save(user);
    }
}
