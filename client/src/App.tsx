import './App.css';
import { Routes } from 'react-router-dom';
import { AuthRoutes } from './pages/auth';
import { HomeRoutes } from './pages/home';
import { ProfileRoutes } from './pages/profiles';

function App() {
    return (
        <Routes>
            <HomeRoutes />
            <AuthRoutes />
            <ProfileRoutes />
        </Routes>
    );
}

export default App;
