import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DropdownItem.module.css';

export interface DropdownItemProps {
    icon?: React.ReactNode;
    label: string;
    onClick?: () => void;
    to?: string;
    variant?: 'default' | 'danger';
    disabled?: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
    icon,
    label,
    onClick,
    to,
    variant = 'default',
    disabled = false,
}) => {
    const classNames = [styles.item, styles[`item--${variant}`], disabled && styles['item--disabled']]
        .filter(Boolean)
        .join(' ');

    // If it's a link
    if (to && !disabled) {
        return (
            <Link to={to} className={classNames}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <span className={styles.label}>{label}</span>
            </Link>
        );
    }

    // If it's a button
    return (
        <button type="button" className={classNames} onClick={onClick} disabled={disabled}>
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.label}>{label}</span>
        </button>
    );
};
