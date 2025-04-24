import { Body, Controller, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from '../users/users.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IUser } from '../shared/interfaces';
import { RegisterDto, LoginDto, UpdatePasswordDto } from './dto';
import { AppException } from '../shared/exceptions/exceptions';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Patch('update-password')
    async updatePassword(@Body() dto: UpdatePasswordDto, @Request() req: AuthenticatedRequest): Promise<Users> {
        if (!req.user) {
            throw AppException.Unauthorized('User not authenticated');
        }

        const { oldPassword, newPassword, confirmPassword } = dto;
        return await this.authService.updatePassword(req.user.id, oldPassword, newPassword, confirmPassword);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Body() dto: LoginDto, @Request() req: AuthenticatedRequest) {
        return this.authService.login(req.user);
    }
}
