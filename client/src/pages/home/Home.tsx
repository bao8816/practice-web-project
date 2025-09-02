import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1 className="home-title">ShopSmart</h1>
                <p className="home-subtitle">Your Ultimate Shopping Destination</p>
            </header>

            <main className="home-main">
                <div className="home-content">
                    <p className="home-description">
                        Discover thousands of products at unbeatable prices. From electronics to fashion, home goods to
                        beauty products - we have everything you need with fast shipping and secure checkout.
                    </p>

                    <div className="home-features">
                        <div className="feature-card">
                            <span className="feature-icon">🚚</span>
                            <h3 className="feature-title">Free Shipping</h3>
                            <p className="feature-description">
                                Free delivery on orders over $50. Fast and reliable shipping worldwide.
                            </p>
                        </div>

                        <div className="feature-card">
                            <span className="feature-icon">🔒</span>
                            <h3 className="feature-title">Secure Payment</h3>
                            <p className="feature-description">
                                Your payments are protected with bank-level security and encryption.
                            </p>
                        </div>

                        <div className="feature-card">
                            <span className="feature-icon">↩️</span>
                            <h3 className="feature-title">Easy Returns</h3>
                            <p className="feature-description">
                                30-day return policy with hassle-free exchanges and refunds.
                            </p>
                        </div>
                    </div>

                    <nav className="home-navigation">
                        <Link to="/products" className="nav-link">
                            Shop Now
                        </Link>
                        <Link to="/categories" className="nav-link">
                            Categories
                        </Link>
                        <Link to="/deals" className="nav-link">
                            Best Deals
                        </Link>
                    </nav>
                </div>
            </main>

            <footer className="home-footer">
                <p>&copy; 2025 ShopSmart. Your trusted online shopping partner.</p>
            </footer>
        </div>
    );
};
