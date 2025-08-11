import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
    @IsNotEmpty()
    oldPassword: string;

    @IsNotEmpty()
    @MinLength(4)
    newPassword: string;

    @IsNotEmpty()
    @MinLength(4)
    confirmPassword: string;
}
