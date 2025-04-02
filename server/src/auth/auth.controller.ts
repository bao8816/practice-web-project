import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from '../users/users.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IUser } from '../shared/interfaces/users.interface';

interface AuthenticatedRequest extends Request {
    user: IUser;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() username: string, password: string): Promise<Users> {
        return this.authService.register(username, password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req: AuthenticatedRequest) {
        return this.authService.login(req.user);
    }
}
