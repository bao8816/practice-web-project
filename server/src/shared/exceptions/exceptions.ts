import { BadRequestException, HttpStatus } from '@nestjs/common';

export class AppException {
    static BadRequest(message = 'Bad Request', error = 'Bad Request', statusCode = HttpStatus.BAD_REQUEST) {
        return new BadRequestException({
            statusCode,
            message,
            error,
        });
    }

    static Unauthorized(message = 'Unauthorized', error = 'Unauthorized', statusCode = HttpStatus.UNAUTHORIZED) {
        return new BadRequestException({
            statusCode,
            message,
            error,
        });
    }

    static Forbidden(message = 'Forbidden', error = 'Forbidden', statusCode = HttpStatus.FORBIDDEN) {
        return new BadRequestException({
            statusCode,
            message,
            error,
        });
    }

    static NotFound(message = 'Not Found', error = 'Not Found', statusCode = HttpStatus.NOT_FOUND) {
        return new BadRequestException({
            statusCode,
            message,
            error,
        });
    }

    static InternalServerError(
        message = 'Internal Server Error',
        error = 'Internal Server Error',
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    ) {
        return new BadRequestException({
            statusCode,
            message,
            error,
        });
    }

    static Conflict(message = 'Conflict', error = 'Conflict', statusCode = HttpStatus.CONFLICT) {
        return new BadRequestException({
            statusCode,
            message,
            error,
        });
    }

    static UnprocessableEntity(
        message = 'Unprocessable Entity',
        error = 'Unprocessable Entity',
        statusCode = HttpStatus.UNPROCESSABLE_ENTITY,
    ) {
        return new BadRequestException({
            statusCode,
            message,
            error,
        });
    }
}
