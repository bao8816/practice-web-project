import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { IUser } from '../shared/interfaces';
import { AppException } from '../shared/exceptions/exceptions';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
    ) {}

    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(12);
        return bcrypt.hash(password, salt);
    }

    async comparePasswords(password: string, passwordHash: string) {
        return bcrypt.compare(password, passwordHash);
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findUserByUsername(username);
        if (!user) {
            return null;
        }

        const isPasswordMatch = await this.comparePasswords(password, user.password);
        return isPasswordMatch ? user : null;
    }

    async register(username: string, password: string, confirmPassword: string) {
        const existingUser = await this.userService.findUserByUsername(username);
        if (existingUser) {
            throw AppException.BadRequest('User already exists');
        }

        if (password !== confirmPassword) {
            throw AppException.BadRequest('Passwords do not match');
        }

        const hashedPassword = await this.hashPassword(password);
        return this.userService.createUser(username, hashedPassword);
    }

    async updatePassword(userId: number, oldPassword: string, newPassword: string, confirmPassword: string) {
        const user = await this.userService.findUserById(userId);
        if (!user) {
            throw AppException.NotFound('User does not exist');
        }

        const isPasswordMatch = await this.comparePasswords(oldPassword, user.password);
        if (!isPasswordMatch) {
            throw AppException.BadRequest('Old password is incorrect');
        }

        if (newPassword !== confirmPassword) {
            throw AppException.BadRequest('Passwords do not match');
        }

        const hashedPassword = await this.hashPassword(newPassword);
        return this.userService.updateUser(userId, { password: hashedPassword });
    }

    login(user: IUser) {
        const payload = { username: user.username, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
