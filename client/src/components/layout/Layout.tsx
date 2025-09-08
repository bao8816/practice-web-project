import { ReactNode, useEffect } from 'react';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer.tsx';
import './Layout.css';

interface LayoutProps {
    children: ReactNode;
    headerVariant?: 'hero' | 'compact';
    showFooter?: boolean;
    className?: string;
}

export const Layout = ({ children, headerVariant = 'compact', showFooter = true, className = '' }: LayoutProps) => {
    useEffect(() => {
        if (headerVariant === 'compact') {
            document.body.classList.add('has-fixed-header');
        } else {
            document.body.classList.remove('has-fixed-header');
        }

        return () => {
            document.body.classList.remove('has-fixed-header');
        };
    }, [headerVariant]);

    return (
        <div className={`layout ${className}`}>
            <Header variant={headerVariant} />

            <main className={`layout-main ${headerVariant === 'compact' ? 'main-with-fixed-header' : ''}`}>
                {children}
            </main>

            {showFooter && <Footer />}
        </div>
    );
};
