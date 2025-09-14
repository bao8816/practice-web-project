import { Route } from 'react-router-dom';
import { Login, Register } from './index';

export const AuthRoutes = () => {
    return (
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </>
    );
};
