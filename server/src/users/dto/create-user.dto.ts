import { IUserRole } from '../../shared/interfaces';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    role?: IUserRole = 'user';

    email?: string | null;
}
