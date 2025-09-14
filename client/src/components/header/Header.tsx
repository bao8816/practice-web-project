import { Link } from 'react-router-dom';
import { useAuth, useLogout } from '../../hooks/auth';
import './Header.css';

interface HeaderProps {
    variant?: 'hero' | 'compact';
    showTitle?: boolean;
    showSubtitle?: boolean;
}

export const Header = ({ variant = 'hero', showTitle = true, showSubtitle = true }: HeaderProps) => {
    const { isAuthenticated } = useAuth();
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate();
    };

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
                        <>
                            <span className="welcome-text">Welcome back!</span>
                            <button
                                onClick={handleLogout}
                                className="auth-btn logout-btn"
                                disabled={logoutMutation.isPending}
                            >
                                {logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}
                            </button>
                        </>
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
