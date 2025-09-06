import { apiClient } from './api';

// Auth API types
export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: number;
        username: string;
    };
}

// Auth API functions
export const authAPI = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data;
    },

    register: async (userData: RegisterData): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('authToken');
    },
};
