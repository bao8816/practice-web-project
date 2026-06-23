import React from 'react';
import styles from './DropdownHeader.module.css';

export interface DropdownHeaderProps {
    children: React.ReactNode;
}

export const DropdownHeader: React.FC<DropdownHeaderProps> = ({ children }) => {
    return <div className={styles.header}>{children}</div>;
};
