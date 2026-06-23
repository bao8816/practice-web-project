import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

export const ROLE_KEY = 'role';

export type Role = 'user' | 'admin';

export function Auth(...role: Role[]) {
    return applyDecorators(SetMetadata(ROLE_KEY, role), UseGuards(JwtAuthGuard, RolesGuard));
}
