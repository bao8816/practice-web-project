import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/auth';
import './UserMenu.css';

interface UserMenuProps {
    username?: string;
    avatarUrl?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ username, avatarUrl }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const logoutMutation = useLogout();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, []);

    const handleLogout = () => {
        setIsOpen(false);
        logoutMutation.mutate();
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="user-menu" ref={menuRef}>
            <button
                type="button"
                className="user-menu-trigger"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-label="User menu"
            >
                <div className="user-avatar">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={username || 'User'} className="avatar-image" />
                    ) : (
                        <div className="avatar-placeholder">
                            <span className="avatar-initial">{username ? username.charAt(0).toUpperCase() : 'U'}</span>
                        </div>
                    )}
                </div>
                <div className="user-info">
                    <span className="user-name">{username || 'User'}</span>
                    <div className="dropdown-arrow">
                        <svg
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                            fill="none"
                            className={`arrow-icon ${isOpen ? 'arrow-up' : ''}`}
                        >
                            <path
                                d="M1 1L6 6L11 1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </button>

            {isOpen && (
                <div className="user-menu-dropdown">
                    <div className="menu-header">
                        <div className="menu-user-info">
                            <div className="menu-avatar">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt={username || 'User'} className="avatar-image" />
                                ) : (
                                    <div className="avatar-placeholder">
                                        <span className="avatar-initial">
                                            {username ? username.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="menu-user-details">
                                <span className="menu-username">{username || 'User'}</span>
                                <span className="menu-user-status">Online</span>
                            </div>
                        </div>
                    </div>

                    <div className="menu-divider"></div>

                    <nav className="menu-items">
                        <Link to="/profiles/me" className="menu-item" onClick={() => setIsOpen(false)}>
                            <svg className="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle
                                    cx="12"
                                    cy="7"
                                    r="4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>My Profile</span>
                        </Link>

                        <Link to="/settings" className="menu-item" onClick={() => setIsOpen(false)}>
                            <svg className="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 1V3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 21V23"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M4.22 4.22L5.64 5.64"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M18.36 18.36L19.78 19.78"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M1 12H3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M21 12H23"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M4.22 19.78L5.64 18.36"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M18.36 5.64L19.78 4.22"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>Settings</span>
                        </Link>
                    </nav>

                    <div className="menu-divider"></div>

                    <div className="menu-footer">
                        <button
                            className="menu-item logout-item"
                            onClick={handleLogout}
                            disabled={logoutMutation.isPending}
                        >
                            <svg className="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16 17L21 12L16 7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M21 12H9"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>{logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
