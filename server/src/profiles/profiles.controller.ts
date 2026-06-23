import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { AuthRequest } from '../shared/interfaces';
import { Profiles } from './profiles.entity';
import { Auth } from '../shared/decorators';
import { CustomParseIntPipe } from '../shared/pipes/custom-parse-int.pipe';

@ApiTags('profiles')
@ApiBearerAuth('jwt')
@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}

    @ApiOperation({ summary: 'List all profiles (admin only)' })
    @UseGuards(JwtAuthGuard)
    @Get()
    @Auth('admin')
    async getAllProfiles(): Promise<Profiles[]> {
        return this.profilesService.findAll();
    }

    @ApiOperation({ summary: "Get current user's profile" })
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMyProfile(@Request() req: AuthRequest): Promise<Profiles> {
        const userId = req.user.id;
        return this.profilesService.findProfileByUserId(userId);
    }

    @ApiOperation({ summary: "Update current user's profile" })
    @UseGuards(JwtAuthGuard)
    @Put('me')
    async updateMyProfile(@Request() req: AuthRequest, @Body() updateProfileDto: UpdateProfileDto): Promise<Profiles> {
        const userId = req.user.id;
        return this.profilesService.updateProfile(userId, updateProfileDto);
    }

    @ApiOperation({ summary: 'Get a profile by user ID' })
    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    async getUserProfile(@Param('userId', CustomParseIntPipe) userId: number): Promise<Profiles> {
        return this.profilesService.findProfileByUserId(userId);
    }

    @ApiOperation({ summary: 'Update a profile by user ID' })
    @UseGuards(JwtAuthGuard)
    @Put(':userId')
    async updateUserProfile(
        @Param('userId', CustomParseIntPipe) userId: number,
        @Body() updateProfileDto: UpdateProfileDto,
        @Request() req: AuthRequest,
    ): Promise<Profiles> {
        return this.profilesService.updateProfile(userId, updateProfileDto, req.user.id, req.user.role);
    }

    @ApiOperation({ summary: 'Create a profile for a user (admin only)' })
    @UseGuards(JwtAuthGuard)
    @Post(':userId')
    @Auth('admin')
    async createUserProfile(
        @Param('userId', CustomParseIntPipe) userId: number,
        @Body() createProfileDto: CreateProfileDto,
    ): Promise<Profiles> {
        return this.profilesService.createProfile(userId, createProfileDto);
    }

    @ApiOperation({ summary: 'Delete a profile by user ID' })
    @UseGuards(JwtAuthGuard)
    @Delete(':userId')
    async deleteUserProfile(@Param('userId', CustomParseIntPipe) userId: number, @Request() req: AuthRequest) {
        return this.profilesService.deleteProfile(userId, req.user.id, req.user.role);
    }
}
