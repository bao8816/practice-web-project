import axios from 'axios';

// Get server host from environment variables
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST || 'http://localhost:3000';

// Create axios instance
export const apiClient = axios.create({
    baseURL: `${SERVER_HOST}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid, clear it
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);
