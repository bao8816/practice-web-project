import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    async findAll() {
        return this.usersRepository.find();
    }

    async findUserById(id: number) {
        return this.usersRepository.findOne({ where: { id } });
    }

    async findUserByUsername(name: string) {
        return this.usersRepository.findOne({ where: { username: name } });
    }

    async createUser(username: string, password: string) {
        const user = this.usersRepository.create({ username, password });
        return this.usersRepository.save(user);
    }
}
