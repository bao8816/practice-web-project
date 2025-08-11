import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLE_KEY } from 'src/shared/decorators/auth.decorator';
import { IUser } from '../../shared/interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Role[]>(ROLE_KEY, context.getHandler());
        if (!requiredRoles) return true;

        const request = context.switchToHttp().getRequest<{ user: IUser }>();
        const user = request.user;

        return requiredRoles.includes(user?.role);
    }
}
