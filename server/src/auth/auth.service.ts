import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { IUser } from '../shared/interfaces/users.interface';

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

    async register(username: string, password: string) {
        const hashedPassword = await this.hashPassword(password);
        return this.userService.createUser(username, hashedPassword);
    }

    login(user: IUser) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
