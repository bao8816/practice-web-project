import { ReactNode } from 'react';
import styles from './Field.module.css';

export interface FieldProps {
    label: string;
    value?: string | ReactNode;
    empty?: boolean;
    children?: ReactNode;
    className?: string;
}

export const Field = ({ label, value, empty, children, className }: FieldProps) => {
    const isDisplayMode = value !== undefined && !children;

    return (
        <div className={`${styles.field} ${className || ''}`}>
            <label className={styles.label}>{label}</label>
            {isDisplayMode ? (
                <div className={`${styles.display} ${empty ? styles.empty : ''}`}>{value}</div>
            ) : (
                <div className={styles.input}>{children}</div>
            )}
        </div>
    );
};
