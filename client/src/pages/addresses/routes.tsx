import { Outlet, RouteObject } from 'react-router-dom';

export const addressRoutes: RouteObject[] = [
    {
        path: '/addresses',
        element: <Outlet />,
        children: [
            {
                path: 'me',
            },
        ],
    },
];
