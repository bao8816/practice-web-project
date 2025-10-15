import { AppException } from '../../shared/exceptions/exceptions';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

export class UsersExceptions {
    static userNotFound() {
        return AppException.NotFound(ERROR_MESSAGES.USER.NOT_FOUND, 'User Not Found');
    }

    static userAlreadyExists() {
        return AppException.Conflict(ERROR_MESSAGES.USER.ALREADY_EXISTS, 'User Conflict');
    }

    static userCreationFailed() {
        return AppException.BadRequest(ERROR_MESSAGES.USER.CREATION_FAILED, 'User Creation Failed');
    }

    static userUpdateFailed() {
        return AppException.BadRequest(ERROR_MESSAGES.USER.UPDATE_FAILED, 'User Update Failed');
    }

    static userDeleteFailed() {
        return AppException.BadRequest(ERROR_MESSAGES.USER.DELETE_FAILED, 'User Delete Failed');
    }

    static insufficientPermission() {
        return AppException.Forbidden(ERROR_MESSAGES.BUSINESS.INSUFFICIENT_PERMISSION, 'Insufficient Permission');
    }

    static operationNotAllowed() {
        return AppException.BadRequest(ERROR_MESSAGES.BUSINESS.OPERATION_NOT_ALLOWED, 'Operation Not Allowed');
    }
}
