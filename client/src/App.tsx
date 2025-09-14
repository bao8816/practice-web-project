import './App.css';
import { Routes } from 'react-router-dom';
import { AuthRoutes } from './pages/auth';
import { HomeRoutes } from './pages/home';

function App() {
    return (
        <Routes>
            <HomeRoutes />
            <AuthRoutes />
        </Routes>
    );
}

export default App;
