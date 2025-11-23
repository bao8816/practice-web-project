import { useRoutes } from 'react-router-dom';
import { homeRoutes } from './pages/home';
import { authRoutes } from './pages/auth';
import { profileRoutes } from './pages/profiles';

function App() {
    const routes = useRoutes([...homeRoutes, ...authRoutes, ...profileRoutes]);

    return routes;
}

export default App;
