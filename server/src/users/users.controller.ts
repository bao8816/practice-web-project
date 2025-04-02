import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';

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
}
