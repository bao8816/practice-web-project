import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersExceptions } from './exceptions';
import { CreateUserDto, UpdateUserDto } from './dto';
import { hashPassword } from '../shared/utils';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private profilesService: ProfilesService,
    ) {}

    async findAll() {
        return this.usersRepository.find();
    }

    async findUserById(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw UsersExceptions.userNotFound();
        }

        return user;
    }

    async findUserByUsername(name: string) {
        const user = await this.usersRepository.findOne({ where: { username: name } });
        if (!user) {
            throw UsersExceptions.userNotFound();
        }

        return user;
    }

    async createUser(userDto: CreateUserDto, skipPasswordHashing = false) {
        const existingUser = await this.usersRepository.findOne({ where: { username: userDto.username } });
        if (existingUser) {
            throw UsersExceptions.userAlreadyExists();
        }

        const user = this.usersRepository.create({
            ...userDto,
            password: skipPasswordHashing ? userDto.password : await hashPassword(userDto.password),
        });

        const savedUser = await this.usersRepository.save(user);

        await this.profilesService.createProfile(savedUser.id);

        return savedUser;
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto) {
        const existingUser = await this.usersRepository.findOne({ where: { id: userId } });
        if (!existingUser) {
            throw UsersExceptions.userNotFound();
        }

        // Create a copy of the DTO to avoid modifying the original
        const updatedFields = { ...updateUserDto };

        // Check username uniqueness if it's being updated
        if (updatedFields.username && updatedFields.username !== existingUser.username) {
            const userWithSameUsername = await this.usersRepository.findOne({
                where: { username: updatedFields.username },
            });

            if (userWithSameUsername) {
                throw UsersExceptions.userAlreadyExists();
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
            throw UsersExceptions.userNotFound();
        }

        if (currentUser.id !== id && currentUser.role !== 'admin') {
            throw UsersExceptions.insufficientPermission();
        }

        return this.usersRepository.remove(user);
    }
}
