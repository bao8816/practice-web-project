import { getErrorMessage } from './api';
import type { AxiosError } from 'axios';
import type { ApiError } from './api';

// Helper to check if error is AxiosError with ApiError data
const isAxiosApiError = (error: unknown): error is AxiosError<ApiError> => {
    return (
        error !== null &&
        typeof error === 'object' &&
        'response' in error &&
        error.response !== null &&
        typeof error.response === 'object' &&
        'data' in error.response
    );
};

// Error severity levels
export enum ErrorSeverity {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical',
}

// Error categories
export enum ErrorCategory {
    AUTHENTICATION = 'authentication',
    AUTHORIZATION = 'authorization',
    VALIDATION = 'validation',
    NETWORK = 'network',
    SERVER = 'server',
    CLIENT = 'client',
    UNKNOWN = 'unknown',
}

// Structured error for UI display
export interface UIError {
    id: string;
    message: string;
    title?: string;
    category: ErrorCategory;
    severity: ErrorSeverity;
    statusCode?: number;
    timestamp: string;
    action?: string; // Suggested action for user
    retryable?: boolean;
    details?: string;
}

// Error context for better debugging
export interface ErrorContext {
    component?: string;
    action?: string;
    userId?: string;
    additionalData?: Record<string, unknown>;
}

// Function to convert raw error to UIError
export const createUIError = (error: unknown, context?: ErrorContext): UIError => {
    const timestamp = new Date().toISOString();
    const id = `error_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Handle Axios API errors
    if (isAxiosApiError(error) && error.response) {
        const apiError = error.response.data;

        return {
            id,
            message: apiError.message,
            title: getErrorTitle(apiError.statusCode),
            category: getErrorCategory(apiError.statusCode),
            severity: getErrorSeverity(apiError.statusCode),
            statusCode: apiError.statusCode,
            timestamp,
            action: getSuggestedAction(apiError.statusCode),
            retryable: isRetryable(apiError.statusCode),
            details: context ? JSON.stringify(context) : undefined,
        };
    }

    // Handle generic errors
    const message = getErrorMessage(error);

    return {
        id,
        message,
        title: 'Unexpected Error',
        category: ErrorCategory.UNKNOWN,
        severity: ErrorSeverity.MEDIUM,
        timestamp,
        action: 'Please try again or contact support if the problem persists',
        retryable: true,
        details: context ? JSON.stringify(context) : undefined,
    };
};

// Helper functions
const getErrorTitle = (statusCode: number): string => {
    switch (statusCode) {
        case 400:
            return 'Bad Request';
        case 401:
            return 'Authentication Required';
        case 403:
            return 'Access Denied';
        case 404:
            return 'Not Found';
        case 422:
            return 'Validation Error';
        case 500:
            return 'Server Error';
        default:
            return 'Error';
    }
};

const getErrorCategory = (statusCode: number): ErrorCategory => {
    if (statusCode === 401) return ErrorCategory.AUTHENTICATION;
    if (statusCode === 403) return ErrorCategory.AUTHORIZATION;
    if ([400, 422].includes(statusCode)) return ErrorCategory.VALIDATION;
    if (statusCode >= 500) return ErrorCategory.SERVER;
    if (statusCode >= 400) return ErrorCategory.CLIENT;
    return ErrorCategory.UNKNOWN;
};

const getErrorSeverity = (statusCode: number): ErrorSeverity => {
    if (statusCode >= 500) return ErrorSeverity.HIGH;
    if ([401, 403].includes(statusCode)) return ErrorSeverity.MEDIUM;
    if ([400, 422].includes(statusCode)) return ErrorSeverity.LOW;
    return ErrorSeverity.MEDIUM;
};

const getSuggestedAction = (statusCode: number): string => {
    switch (statusCode) {
        case 401:
            return 'Please log in to continue';
        case 403:
            return 'You do not have permission for this action';
        case 404:
            return 'The requested resource was not found';
        case 422:
            return 'Please check your input and try again';
        case 500:
            return 'Please try again later or contact support';
        default:
            return 'Please try again';
    }
};

const isRetryable = (statusCode: number): boolean => {
    // Server errors and network issues are typically retryable
    return statusCode >= 500 || statusCode === 0;
};
