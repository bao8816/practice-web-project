import { Layout } from '../../components/layout';
import { HomeBody } from './HomeBody';
import './Home.css';

export const Home = () => {
    return (
        <Layout headerVariant="hero" className="home-container">
            <HomeBody />
        </Layout>
    );
};
