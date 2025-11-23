import React from 'react';
import type { ApiError } from '../../types/errors';
import './ErrorDisplay.css';

interface ErrorDisplayProps {
    error: ApiError;
    onDismiss?: () => void;
    onRetry?: () => void;
    compact?: boolean;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onDismiss, onRetry, compact = false }) => {
    const formatMessage = (message: string | string[]): React.ReactNode => {
        if (Array.isArray(message)) {
            return (
                <ul className="error-message-list">
                    {message.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            );
        }
        return <span>{message}</span>;
    };

    const getSeverityIcon = (statusCode: number): string => {
        if (statusCode >= 500) return '🚨'; // Server errors
        if (statusCode === 401 || statusCode === 403) return '🔒'; // Auth errors
        if (statusCode >= 400) return '⚠️'; // Client errors
        return 'ℹ️';
    };

    const getErrorTitle = (statusCode: number, errorType: string): string => {
        if (statusCode === 401) return 'Authentication Required';
        if (statusCode === 403) return 'Access Denied';
        if (statusCode === 404) return 'Not Found';
        if (statusCode === 422) return 'Validation Error';
        if (statusCode >= 500) return 'Server Error';
        return errorType || 'Error';
    };

    const getCategoryClass = (statusCode: number): string => {
        if (statusCode === 401 || statusCode === 403) return 'auth';
        if (statusCode === 422 || statusCode === 400) return 'validation';
        if (statusCode >= 500) return 'server';
        if (statusCode >= 400) return 'client';
        return 'unknown';
    };

    const formatTimestamp = (timestamp: string): string => {
        return new Date(timestamp).toLocaleTimeString();
    };

    if (compact) {
        return (
            <div className={`error-display compact ${getCategoryClass(error.statusCode)}`}>
                <span className="error-icon">{getSeverityIcon(error.statusCode)}</span>
                <div className="error-field-value">{formatMessage(error.message)}</div>
                {onDismiss && (
                    <button className="error-dismiss" onClick={onDismiss} aria-label="Dismiss error">
                        ×
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className={`error-display ${getCategoryClass(error.statusCode)}`}>
            <div className="error-header">
                <div className="error-title">
                    <span className="error-icon">{getSeverityIcon(error.statusCode)}</span>
                    <h4>{getErrorTitle(error.statusCode, error.error)}</h4>
                </div>
            </div>

            <div className="error-content">
                <div className="error-field">
                    <span className="error-field-label">Time:</span>
                    <div className="error-field-value">{formatTimestamp(error.timestamp)}</div>
                </div>

                <div className="error-field">
                    <span className="error-field-label">Status:</span>
                    <div className="error-field-value">HTTP {error.statusCode}</div>
                </div>

                <div className="error-field">
                    <span className="error-field-label">Endpoint:</span>
                    <div className="error-field-value">
                        {error.method} {error.path}
                    </div>
                </div>

                <div className="error-field">
                    <span className="error-field-label">Message:</span>
                    <div className="error-field-value">{formatMessage(error.message)}</div>
                </div>
            </div>

            <div className="error-actions">
                {onRetry && (
                    <button className="error-retry-btn" onClick={onRetry}>
                        Try Again
                    </button>
                )}
                {onDismiss && (
                    <button className="error-dismiss-btn" onClick={onDismiss}>
                        Dismiss
                    </button>
                )}
            </div>

            {error.stack && import.meta.env.DEV && (
                <details className="error-details">
                    <summary>🐛 Stack Trace (Dev Mode)</summary>
                    <pre>{error.stack}</pre>
                </details>
            )}
        </div>
    );
};

export default ErrorDisplay;
