import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from '../shared/decorators';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../shared/interfaces';
import { CustomParseIntPipe } from '../shared/pipes/custom-parse-int.pipe';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.findAll();
    }

    @Get(':id')
    getUserById(@Param('id', CustomParseIntPipe) userId: number) {
        return this.usersService.findUserById(userId);
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
    updateUser(@Param('id', CustomParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(userId, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteUser(@Param('id', CustomParseIntPipe) userId: number, @Request() req: AuthRequest) {
        const currentUser = req.user;
        return this.usersService.deleteUser(userId, currentUser);
    }
}
