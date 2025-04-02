import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Users } from '../../users/users.entity';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        await dataSource.query('TRUNCATE "users" CASCADE;');

        const repository = dataSource.getRepository(Users);
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
