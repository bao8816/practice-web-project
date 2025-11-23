import { RouteObject, Outlet } from 'react-router-dom';
import { MyProfile, MyProfileEdit, UserProfile } from './index';

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
                path: 'me/edit',
                element: <MyProfileEdit />,
            },
            {
                path: ':userId',
                element: <UserProfile />,
            },
        ],
    },
];
