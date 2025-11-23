import type { ApiError } from '../../types/errors';

interface ErrorDisplayHookOptions {
    error: ApiError | null;
    onDismiss?: () => void;
    onRetry?: () => void;
    compact?: boolean;
}

/**
 * Hook to provide consistent ErrorDisplay props
 * Standardizes error display across the application
 */
export const useErrorDisplayProps = ({
    error,
    onDismiss,
    onRetry,
    compact = true, // Default to compact for forms
}: ErrorDisplayHookOptions) => {
    if (!error) return null;

    return {
        error,
        onDismiss,
        onRetry,
        compact,
    };
};
