    import React from 'react';
import { useLogout } from '../../hooks/auth';
import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from '../ui/Dropdown';
import './UserMenu.css';

interface UserMenuProps {
    username?: string;
    avatarUrl?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ username, avatarUrl }) => {
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    const trigger = (
        <div className="user-menu-trigger">
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
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
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
        </div>
    );

    return (
        <Dropdown trigger={trigger} align="right" className="user-menu">
            <DropdownHeader>
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
                        <span className="menu-username" title={username || 'User'}>
                            {username || 'User'}
                        </span>
                        <span className="menu-user-status">Online</span>
                    </div>
                </div>
            </DropdownHeader>

            <DropdownItem
                to="/profiles/me"
                label="My Profile"
                icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                }
            />

            <DropdownItem
                to="/addresses/me"
                label="My Addresses"
                icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9 22V12H15V22"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                }
            />

            <DropdownItem
                to="/settings"
                label="Settings"
                icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                }
            />

            <DropdownDivider />

            <DropdownItem
                onClick={handleLogout}
                label={logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}
                variant="danger"
                disabled={logoutMutation.isPending}
                icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                }
            />
        </Dropdown>
    );
};
