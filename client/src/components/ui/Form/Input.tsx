import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, leftIcon, rightIcon, className = '', id, required, ...props }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
        const hasError = !!error;

        return (
            <div className={styles.inputWrapper}>
                {label && (
                    <label htmlFor={inputId} className={styles.label}>
                        {label}
                        {required && <span className={styles.required}> *</span>}
                    </label>
                )}

                <div className={styles.inputContainer}>
                    {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
                    <input
                        ref={ref}
                        id={inputId}
                        className={[
                            styles.input,
                            hasError && styles['input--error'],
                            leftIcon && styles['input--with-left-icon'],
                            rightIcon && styles['input--with-right-icon'],
                            className,
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        aria-invalid={hasError}
                        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                        required={required}
                        {...props}
                    />
                    {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
                </div>

                {error && (
                    <span id={`${inputId}-error`} className={styles.error} role="alert">
                        {error}
                    </span>
                )}

                {!error && helperText && (
                    <span id={`${inputId}-helper`} className={styles.helperText}>
                        {helperText}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
