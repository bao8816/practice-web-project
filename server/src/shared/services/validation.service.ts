import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Users } from '../../users/users.entity';
import { AppException } from '../exceptions/exceptions';

@Injectable()
export class ValidationService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    async validateUserExists(userId: number, customMessage?: string): Promise<Users> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw AppException.NotFound(customMessage || `User with ID ${userId} does not exist`);
        }
        return user;
    }

    async validateUsersExist(userIds: number[]): Promise<Users[]> {
        const users = await this.usersRepository.find({
            where: { id: In(userIds) },
        });
        if (users.length !== userIds.length) {
            const foundIds = users.map((u) => u.id);
            const missingIds = userIds.filter((id) => !foundIds.includes(id));
            throw AppException.NotFound(`Users with IDs ${missingIds.join(', ')} do not exist`);
        }
        return users;
    }

    async validateUsernameUnique(username: string, excludeUserId?: number): Promise<void> {
        const query = this.usersRepository.createQueryBuilder('user').where('user.username = :username', { username });

        if (excludeUserId) {
            query.andWhere('user.id != :excludeUserId', { excludeUserId });
        }

        const existingUser = await query.getOne();
        if (existingUser) {
            throw AppException.BadRequest(`User with username ${username} already exists`);
        }
    }

    // Có thể mở rộng thêm các validation khác cho entities khác
    // async validateProductExists(productId: number): Promise<Product> { ... }
    // async validateCategoryExists(categoryId: number): Promise<Category> { ... }
}
