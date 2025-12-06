import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'elevated' | 'outlined' | 'gradient-border';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ children, variant = 'elevated', padding = 'md', className = '', ...props }, ref) => {
        const classNames = [styles.card, styles[`card--${variant}`], styles[`card--padding-${padding}`], className]
            .filter(Boolean)
            .join(' ');

        return (
            <div ref={ref} className={classNames} {...props}>
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
