import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { AppException } from '../shared/exceptions/exceptions';
import { AuthRequest } from '../shared/interfaces';
import { Profiles } from './profiles.entity';
import { Auth } from '../shared/decorators';
import { CustomParseIntPipe } from '../shared/pipes/custom-parse-int.pipe';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @Auth('admin')
    async getAllProfiles(): Promise<Profiles[]> {
        return this.profilesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMyProfile(@Request() req: AuthRequest): Promise<Profiles> {
        const userId = req.user.id;
        return this.profilesService.findProfileByUserId(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('me')
    async updateMyProfile(@Request() req: AuthRequest, @Body() updateProfileDto: UpdateProfileDto): Promise<Profiles> {
        const userId = req.user.id;
        return this.profilesService.updateProfile(userId, updateProfileDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    async getUserProfile(
        @Param('userId', CustomParseIntPipe) userId: number,
        @Request() req: AuthRequest,
    ): Promise<Profiles> {
        // Only admin or the user themselves can view their profile
        if (req.user.id !== userId && req.user.role !== 'admin') {
            throw AppException.Forbidden(`You don't have permission to view this profile`);
        }

        return this.profilesService.findProfileByUserId(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':userId')
    async updateUserProfile(
        @Param('userId', CustomParseIntPipe) userId: number,
        @Body() updateProfileDto: UpdateProfileDto,
        @Request() req: AuthRequest,
    ): Promise<Profiles> {
        // Only admin or the user themselves can update their profile
        if (req.user.id !== userId && req.user.role !== 'admin') {
            throw AppException.Forbidden(`You don't have permission to update this profile`);
        }

        return this.profilesService.updateProfile(userId, updateProfileDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':userId')
    @Auth('admin')
    async createUserProfile(
        @Param('userId', CustomParseIntPipe) userId: number,
        @Body() createProfileDto: CreateProfileDto,
    ): Promise<Profiles> {
        return this.profilesService.createProfile(userId, createProfileDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':userId')
    async deleteUserProfile(@Param('userId', CustomParseIntPipe) userId: number, @Request() req: AuthRequest) {
        // Only admin or the user themselves can delete their profile
        if (req.user.id !== userId && req.user.role !== 'admin') {
            throw AppException.Forbidden(`You don't have permission to delete this profile`);
        }

        return this.profilesService.deleteProfile(userId);
    }
}
