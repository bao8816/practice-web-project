import { RouteObject } from 'react-router-dom';
import { Home } from './index';

export const homeRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
];
