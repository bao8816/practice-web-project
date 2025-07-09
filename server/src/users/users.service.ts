import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppException } from '../shared/exceptions/exceptions';
import { CreateUserDto, UpdateUserDto } from './dto';
import { hashPassword } from '../shared/utils';

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

    async createUser(userDto: CreateUserDto, skipPasswordHashing = false) {
        const existingUser = await this.usersRepository.findOne({ where: { username: userDto.username } });
        if (existingUser) {
            throw AppException.BadRequest(`User with username ${userDto.username} already exists`);
        }

        const user = this.usersRepository.create({
            ...userDto,
            password: skipPasswordHashing ? userDto.password : await hashPassword(userDto.password),
        });

        return await this.usersRepository.save(user);
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto) {
        const existingUser = await this.usersRepository.findOne({ where: { id: userId } });
        if (!existingUser) {
            throw AppException.NotFound(`User not found`);
        }

        // Create a copy of the DTO to avoid modifying the original
        const updatedFields = { ...updateUserDto };

        // Check username uniqueness if it's being updated
        if (updatedFields.username && updatedFields.username !== existingUser.username) {
            const userWithSameUsername = await this.usersRepository.findOne({
                where: { username: updatedFields.username },
            });

            if (userWithSameUsername) {
                throw AppException.BadRequest(`User with username ${updatedFields.username} already exists`);
            }
        }

        if (updatedFields.password) {
            updatedFields.password = await hashPassword(updatedFields.password);
        }

        const updatedUser = Object.assign(existingUser, updatedFields);

        return this.usersRepository.save(updatedUser);
    }

    async deleteUser(id: number, currentUser: { id: number; role: string }) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw AppException.NotFound(`User not found`);
        }

        if (currentUser.id !== id && currentUser.role !== 'admin') {
            throw AppException.Forbidden(`You don't have permission to delete this user`);
        }

        return this.usersRepository.remove(user);
    }
}
