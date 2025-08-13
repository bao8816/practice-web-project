import { IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @MinLength(4)
    password: string;

    @IsNotEmpty()
    @MinLength(4)
    confirmPassword: string;
}
