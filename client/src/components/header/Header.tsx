import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useMyProfile } from '../../hooks/profiles';
import { UserMenu } from '../user-menu';
import './Header.css';

interface HeaderProps {
    variant?: 'hero' | 'compact';
    showTitle?: boolean;
    showSubtitle?: boolean;
}

export const Header = ({ variant = 'hero', showTitle = true, showSubtitle = true }: HeaderProps) => {
    const { isAuthenticated } = useAuth();
    const { data: profile } = useMyProfile(isAuthenticated);

    return (
        <header className={`header ${variant === 'compact' ? 'header-compact' : 'header-hero'}`}>
            <div className="header-content">
                <div className="header-main">
                    <Link to="/" className="header-logo">
                        {showTitle && (
                            <h1 className={`header-title ${variant === 'compact' ? 'title-compact' : 'title-hero'}`}>
                                ShopSmart
                            </h1>
                        )}
                    </Link>
                    {variant === 'hero' && showSubtitle && (
                        <p className="header-subtitle">Your Ultimate Shopping Destination</p>
                    )}

                    {variant === 'compact' && (
                        <nav className="header-nav">
                            <Link to="/products" className="nav-item">
                                Products
                            </Link>
                            <Link to="/categories" className="nav-item">
                                Categories
                            </Link>
                            <Link to="/deals" className="nav-item">
                                Deals
                            </Link>
                        </nav>
                    )}
                </div>

                <div className="header-auth">
                    {isAuthenticated ? (
                        <UserMenu username={profile?.fullName || 'User'} avatarUrl={profile?.avatarUrl} />
                    ) : (
                        <>
                            <Link to="/login" className="auth-btn login-btn">
                                Sign In
                            </Link>
                            <Link to="/register" className="auth-btn register-btn">
                                Join Now
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
