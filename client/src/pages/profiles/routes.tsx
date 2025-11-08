import { RouteObject } from 'react-router-dom';
import { Profile } from './index';

export const profileRoutes: RouteObject[] = [
    {
        path: '/profile',
        element: <Profile />,
        children: [
            // Nested routes sẽ được define ở đây
            // { path: '', element: <ProfileOverview /> },           // /profile (default)
            // { path: 'edit', element: <ProfileEdit /> },           // /profile/edit
            // { path: 'settings', element: <ProfileSettings /> },   // /profile/settings
            // { path: 'addresses', element: <ProfileAddresses /> }, // /profile/addresses
        ],
    },
];
