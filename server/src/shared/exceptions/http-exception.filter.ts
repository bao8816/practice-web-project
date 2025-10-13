import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const exceptionResponse = exception.getResponse();
        const errorResponse =
            typeof exceptionResponse === 'object'
                ? (exceptionResponse as Record<string, any>)
                : { message: exceptionResponse };

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            ...errorResponse,
            // Only include stack trace in development mode
            ...(process.env.NODE_ENV === 'development' && {
                stack: exception.stack,
            }),
        });
    }
}
