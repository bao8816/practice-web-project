import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Auth } from '../shared/decorators';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../shared/interfaces';
import { CustomParseIntPipe } from '../shared/pipes/custom-parse-int.pipe';

@ApiTags('users')
@ApiBearerAuth('jwt')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'List all users' })
    @Get()
    getUsers() {
        return this.usersService.findAll();
    }

    @ApiOperation({ summary: 'Get a user by ID' })
    @Get(':id')
    getUserById(@Param('id', CustomParseIntPipe) userId: number) {
        return this.usersService.findUserById(userId);
    }

    @ApiOperation({ summary: 'Get a user by username' })
    @Get('username/:username')
    getUserByUsername(@Param('username') username: string) {
        return this.usersService.findUserByUsername(username);
    }

    @ApiOperation({ summary: 'Create a new user (admin only)' })
    @Post()
    @Auth('admin')
    createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Update a user by ID' })
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateUser(@Param('id', CustomParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(userId, updateUserDto);
    }

    @ApiOperation({ summary: 'Delete a user by ID' })
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteUser(@Param('id', CustomParseIntPipe) userId: number, @Request() req: AuthRequest) {
        const currentUser = req.user;
        return this.usersService.deleteUser(userId, currentUser);
    }
}
