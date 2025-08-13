export type IUser = {
    id: number;
    username: string;
    password: string;
    email?: string;
    role: IUserRole;
};

export type IUserRole = 'user' | 'admin';
