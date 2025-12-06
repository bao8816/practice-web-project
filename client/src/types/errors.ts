// Simple error types and utilities
export interface ApiError {
    statusCode: number;
    timestamp: string;
    path: string;
    method: string;
    message: string | string[]; // Support both single message and array of messages
    error: string;
    stack?: string; // Only in development mode
}

export const getErrorMessage = (error: unknown): string => {
    // If it's an axios error with our API structure
    if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response &&
        error.response.data &&
        typeof error.response.data === 'object' &&
        'message' in error.response.data &&
        typeof (error.response.data as { message: unknown }).message === 'string'
    ) {
        return (error.response.data as { message: string }).message;
    }

    // If it's a direct error object with message
    if (error instanceof Error) {
        return error.message;
    }

    return 'An unexpected error occurred';
};
