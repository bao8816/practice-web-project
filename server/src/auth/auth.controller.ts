import { Body, Controller, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Users } from '../users/users.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto, LoginDto, UpdatePasswordDto } from './dto';
import { AppException } from '../shared/exceptions/exceptions';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthRequest } from '../shared/interfaces';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Register a new user account' })
    @Post('register')
    async register(@Body() dto: RegisterDto): Promise<Users> {
        const { username, password, confirmPassword } = dto;
        return await this.authService.register(username, password, confirmPassword);
    }

    @ApiOperation({ summary: "Update current user's password" })
    @ApiBearerAuth('jwt')
    @UseGuards(JwtAuthGuard)
    @Patch('update-password')
    async updatePassword(@Body() dto: UpdatePasswordDto, @Request() req: AuthRequest): Promise<Users> {
        if (!req.user) {
            throw AppException.Unauthorized('User not authenticated');
        }

        const { oldPassword, newPassword, confirmPassword } = dto;
        return await this.authService.updatePassword(req.user.id, oldPassword, newPassword, confirmPassword);
    }

    @ApiOperation({ summary: 'Log in with username/password (returns JWT)' })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Body() dto: LoginDto, @Request() req: AuthRequest) {
        return this.authService.login(req.user);
    }
}
