import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '../shared/interfaces';
import { AppException } from '../shared/exceptions/exceptions';

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
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw AppException.NotFound(`User not found`);
        }

        return user;
    }

    async findUserByUsername(name: string) {
        const user = await this.usersRepository.findOne({ where: { username: name } });
        if (!user) {
            throw AppException.NotFound(`User not found`);
        }

        return user;
    }

    async createUser(username: string, password: string) {
        const user = this.usersRepository.create({ username, password });
        return this.usersRepository.save(user);
    }

    async updateUser(userId: number, update: Partial<IUser>) {
        const existingUser = await this.usersRepository.findOne({ where: { id: userId } });
        if (!existingUser) {
            throw AppException.NotFound(`User not found`);
        }

        Object.assign(existingUser, update);
        return this.usersRepository.save(existingUser);
    }

    async deleteUser(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw AppException.NotFound(`User not found`);
        }

        return this.usersRepository.remove(user);
    }
}
