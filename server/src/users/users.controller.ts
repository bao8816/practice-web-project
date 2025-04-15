import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from '../shared/decorators/auth.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    // TODO: this @Auth decorator is just for testing purposes, remove it later
    @Auth('admin')
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
