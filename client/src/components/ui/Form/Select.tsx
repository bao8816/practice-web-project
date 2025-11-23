import React, { forwardRef } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options: SelectOption[];
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, helperText, options, placeholder, className = '', id, required, ...props }, ref) => {
        const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
        const hasError = !!error;

        return (
            <div className={styles.selectWrapper}>
                {label && (
                    <label htmlFor={selectId} className={styles.label}>
                        {label}
                        {required && <span className={styles.required}> *</span>}
                    </label>
                )}

                <div className={styles.selectContainer}>
                    <select
                        ref={ref}
                        id={selectId}
                        className={[styles.select, hasError && styles['select--error'], className]
                            .filter(Boolean)
                            .join(' ')}
                        aria-invalid={hasError}
                        aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
                        required={required}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option key={option.value} value={option.value} disabled={option.disabled}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <span className={styles.arrow} aria-hidden="true">
                        ▼
                    </span>
                </div>

                {error && (
                    <span id={`${selectId}-error`} className={styles.error} role="alert">
                        {error}
                    </span>
                )}

                {!error && helperText && (
                    <span id={`${selectId}-helper`} className={styles.helperText}>
                        {helperText}
                    </span>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
