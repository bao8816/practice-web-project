export class UpdateUserDto {
    username?: string;
    password?: string;
    email?: string | null;
    role?: 'user' | 'admin';
}
