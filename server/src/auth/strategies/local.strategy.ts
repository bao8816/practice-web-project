import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AppException } from '../../shared/exceptions/exceptions';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'username', passwordField: 'password' });
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw AppException.Unauthorized();
        }
        return user;
    }
}
