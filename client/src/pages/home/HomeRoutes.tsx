import { Route } from 'react-router-dom';
import { Home } from './index';

export const HomeRoutes = () => {
    return (
        <>
            <Route path="/" element={<Home />} />
        </>
    );
};
