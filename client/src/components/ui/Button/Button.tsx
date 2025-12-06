import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            loading = false,
            disabled = false,
            fullWidth = false,
            leftIcon,
            rightIcon,
            className = '',
            type = 'button',
            ...props
        },
        ref
    ) => {
        const classNames = [
            styles.btn,
            styles[`btn--${variant}`],
            styles[`btn--${size}`],
            fullWidth && styles['btn--full'],
            loading && styles['btn--loading'],
            className,
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <button ref={ref} type={type} className={classNames} disabled={disabled || loading} {...props}>
                {loading && <span className={styles.spinner} />}
                {!loading && leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
                <span className={styles.label}>{children}</span>
                {!loading && rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';
