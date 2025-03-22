import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Doe' },
    ];

    findAll() {
        return this.users;
    }

    findUserById(id: number) {
        return this.users.find((user) => user.id === id);
    }
}
