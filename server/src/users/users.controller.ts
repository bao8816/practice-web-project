import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.findAll();
    }

    @Get()
    getUserById(userId: number) {
        return this.usersService.findUserById(userId);
    }
}
