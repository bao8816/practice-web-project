import { Route } from 'react-router-dom';
import { Profile } from './index';

export const ProfileRoutes = () => {
    return (
        <>
            <Route path="/profile" element={<Profile />} />
        </>
    );
};
