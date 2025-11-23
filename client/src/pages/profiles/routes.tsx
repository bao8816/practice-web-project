import { RouteObject, Outlet } from 'react-router-dom';
import { MyProfile, UserProfile } from './index';

export const profileRoutes: RouteObject[] = [
    {
        path: '/profiles',
        element: <Outlet />,
        children: [
            {
                path: 'me',
                element: <MyProfile />,
            },
            {
                path: 'user/:userId',
                element: <UserProfile />,
            },
        ],
    },
];
