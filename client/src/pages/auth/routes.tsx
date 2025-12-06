import { RouteObject } from 'react-router-dom';
import { Login, Register } from './index';

export const authRoutes: RouteObject[] = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
];
