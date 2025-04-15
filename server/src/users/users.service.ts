import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    async findAll(role: string = 'user') {
        return this.usersRepository.find({ where: { role } });
    }

    async findUserById(id: number, roleRequired: string = 'user') {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new HttpException('User not found', 404);
        }
        if (user.role !== roleRequired) {
            throw new HttpException('You are not authorized to access this user', 403);
        }
        return user;
    }

    async findUserByUsername(name: string, roleRequired: string = 'user') {
        const user = await this.usersRepository.findOne({ where: { username: name } });
        if (!user) {
            throw new HttpException('User not found', 404);
        }
        if (user.role !== roleRequired) {
            throw new HttpException('You are not authorized to access this user', 403);
        }
        return user;
    }

    async createUser(username: string, password: string) {
        const user = this.usersRepository.create({ username, password });
        return this.usersRepository.save(user);
    }
}
