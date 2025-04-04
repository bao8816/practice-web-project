import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeds/seeder.module';
import UserSeeder from './seeds/user.seeder';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(SeederModule);
    const userSeeder = app.get(UserSeeder);
    await userSeeder.run();
    await app.close();
}

void bootstrap();
