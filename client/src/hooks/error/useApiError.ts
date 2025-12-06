import { useMemo } from 'react';
import type { AxiosError } from 'axios';
import type { ApiError } from '../../types/errors';

interface UseApiErrorOptions {
    error: unknown;
    fallbackMessage?: string;
    path?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    errorType?: string;
}

/**
 * Custom hook to convert various error types to ApiError format
 * Centralizes error handling logic across the application
 */
export const useApiError = ({
    error,
    fallbackMessage = 'An error occurred. Please try again.',
    path = '/unknown',
    method = 'GET',
    errorType = 'Error',
}: UseApiErrorOptions): ApiError | null => {
    return useMemo(() => {
        if (!error) return null;

        // If it's already an AxiosError with ApiError response
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError?.response?.data) {
            return axiosError.response.data;
        }

        // Create fallback ApiError
        return {
            statusCode: axiosError?.response?.status || 500,
            message: axiosError?.message || fallbackMessage,
            error: errorType,
            timestamp: new Date().toISOString(),
            path,
            method,
        };
    }, [error, fallbackMessage, path, method, errorType]);
};
