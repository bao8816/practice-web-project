import { AppException } from '../../shared/exceptions/exceptions';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

export class PasswordExceptions {
    static mismatch() {
        return AppException.BadRequest(ERROR_MESSAGES.PASSWORD.MISMATCH, 'Password Validation Failed');
    }

    static tooWeak() {
        return AppException.BadRequest(ERROR_MESSAGES.PASSWORD.TOO_WEAK, 'Password Validation Failed');
    }

    static oldPasswordIncorrect() {
        return AppException.BadRequest(ERROR_MESSAGES.PASSWORD.OLD_PASSWORD_INCORRECT, 'Password Validation Failed');
    }

    static sameAsOld() {
        return AppException.BadRequest(ERROR_MESSAGES.PASSWORD.SAME_AS_OLD, 'Password Validation Failed');
    }
}
