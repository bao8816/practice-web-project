import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from '../shared/decorators';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../shared/interfaces';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.findAll();
    }

    @Get(':id')
    getUserById(@Param('id') userId: string) {
        return this.usersService.findUserById(Number(userId));
    }

    @Get('username/:username')
    getUserByUsername(@Param('username') username: string) {
        return this.usersService.findUserByUsername(username);
    }

    @Post()
    @Auth('admin')
    createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(Number(userId), updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteUser(@Param('id') userId: string, @Request() req: AuthRequest) {
        const currentUser = req.user;
        return this.usersService.deleteUser(Number(userId), currentUser);
    }
}
