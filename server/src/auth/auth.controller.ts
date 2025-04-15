import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from '../users/users.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IUser } from '../shared/interfaces/users.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

interface AuthenticatedRequest extends Request {
    user: IUser;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: RegisterDto): Promise<Users> {
        const { username, password, confirmPassword } = dto;
        return await this.authService.register(username, password, confirmPassword);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Body() dto: LoginDto, @Request() req: AuthenticatedRequest) {
        return this.authService.login(req.user);
    }
}
