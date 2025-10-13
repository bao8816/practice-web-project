import {
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
    ConflictException,
    UnprocessableEntityException,
    HttpStatus,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants/error-messages';

// TODO: consider adding exception for each moodule or user all in one file
export class AppException {
    static BadRequest(
        message: string = ERROR_MESSAGES.GENERAL.BAD_REQUEST,
        errorType: string = 'Bad Request',
        statusCode: number = HttpStatus.BAD_REQUEST,
    ) {
        return new BadRequestException({
            statusCode,
            message,
            error: errorType,
        });
    }

    static Unauthorized(
        message: string = ERROR_MESSAGES.AUTH.UNAUTHORIZED,
        errorType: string = 'Unauthorized',
        statusCode: number = HttpStatus.UNAUTHORIZED,
    ) {
        return new UnauthorizedException({
            statusCode,
            message,
            error: errorType,
        });
    }

    static Forbidden(
        message: string = ERROR_MESSAGES.GENERAL.FORBIDDEN,
        errorType: string = 'Forbidden',
        statusCode: number = HttpStatus.FORBIDDEN,
    ) {
        return new ForbiddenException({
            statusCode,
            message,
            error: errorType,
        });
    }

    static NotFound(
        message: string = ERROR_MESSAGES.GENERAL.NOT_FOUND,
        errorType: string = 'Not Found',
        statusCode: number = HttpStatus.NOT_FOUND,
    ) {
        return new NotFoundException({
            statusCode,
            message,
            error: errorType,
        });
    }

    static InternalServerError(
        message: string = ERROR_MESSAGES.GENERAL.INTERNAL_ERROR,
        errorType: string = 'Internal Server Error',
        statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    ) {
        return new InternalServerErrorException({
            statusCode,
            message,
            error: errorType,
        });
    }

    static Conflict(
        message: string = ERROR_MESSAGES.BUSINESS.RESOURCE_CONFLICT,
        errorType: string = 'Conflict',
        statusCode: number = HttpStatus.CONFLICT,
    ) {
        return new ConflictException({
            statusCode,
            message,
            error: errorType,
        });
    }

    static UnprocessableEntity(
        message: string = ERROR_MESSAGES.VALIDATION.INVALID_FORMAT,
        errorType: string = 'Unprocessable Entity',
        statusCode: number = HttpStatus.UNPROCESSABLE_ENTITY,
    ) {
        return new UnprocessableEntityException({
            statusCode,
            message,
            error: errorType,
        });
    }
}
