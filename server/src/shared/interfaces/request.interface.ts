import { Request } from 'express';
import { IUser } from './users.interface';

/**
 * Extends the Express Request with authenticated user information.
 * Used in routes protected by authentication guards.
 */
export interface AuthRequest extends Request {
    user: IUser;
}
