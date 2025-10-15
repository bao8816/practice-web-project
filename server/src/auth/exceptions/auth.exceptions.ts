import { AppException } from '../../shared/exceptions/exceptions';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

export class AuthExceptions {
    static invalidCredentials() {
        return AppException.Unauthorized(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, 'Authentication Failed');
    }

    static userNotFound() {
        return AppException.NotFound(ERROR_MESSAGES.AUTH.USER_NOT_FOUND, 'User Not Found');
    }

    static wrongPassword() {
        return AppException.Unauthorized(ERROR_MESSAGES.AUTH.WRONG_PASSWORD, 'Authentication Failed');
    }

    static tokenExpired() {
        return AppException.Unauthorized(ERROR_MESSAGES.AUTH.TOKEN_EXPIRED, 'Token Expired');
    }

    static tokenInvalid() {
        return AppException.Unauthorized(ERROR_MESSAGES.AUTH.TOKEN_INVALID, 'Token Invalid');
    }

    static unauthorized() {
        return AppException.Unauthorized(ERROR_MESSAGES.AUTH.UNAUTHORIZED, 'Unauthorized');
    }
}
