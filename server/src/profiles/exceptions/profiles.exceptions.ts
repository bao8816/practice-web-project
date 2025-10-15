import { AppException } from '../../shared/exceptions/exceptions';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

export class ProfilesException {
    // Profile not found errors
    static ProfileNotFound(userId?: number) {
        const message = userId ? `Profile not found for user ${userId}` : ERROR_MESSAGES.PROFILE.NOT_FOUND;
        return AppException.NotFound(message, 'Profile Not Found');
    }

    static NoProfilesFound() {
        return AppException.NotFound('No profiles found', 'Profiles Not Found');
    }

    // Profile already exists errors
    static ProfileAlreadyExists(userId?: number) {
        const message = userId ? `Profile for user ${userId} already exists` : ERROR_MESSAGES.PROFILE.ALREADY_EXISTS;
        return AppException.BadRequest(message, 'Profile Already Exists');
    }

    // Profile access errors
    static ProfileAccessDenied() {
        return AppException.Forbidden(ERROR_MESSAGES.PROFILE.ACCESS_DENIED, 'Profile Access Denied');
    }

    static InsufficientPermissionToUpdate() {
        return AppException.Forbidden("You don't have permission to update this profile", 'Profile Update Denied');
    }

    static InsufficientPermissionToDelete() {
        return AppException.Forbidden("You don't have permission to delete this profile", 'Profile Delete Denied');
    }

    // Profile operation errors
    static ProfileCreationFailed() {
        return AppException.BadRequest(ERROR_MESSAGES.PROFILE.CREATION_FAILED, 'Profile Creation Failed');
    }

    static ProfileUpdateFailed() {
        return AppException.BadRequest(ERROR_MESSAGES.PROFILE.UPDATE_FAILED, 'Profile Update Failed');
    }

    static ProfileDeleteFailed() {
        return AppException.BadRequest(ERROR_MESSAGES.PROFILE.DELETE_FAILED, 'Profile Delete Failed');
    }
}
