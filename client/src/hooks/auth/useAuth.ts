import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services';
import type { AxiosError } from 'axios';
import type { ApiError } from '../../types/errors';
import { getErrorMessage } from '../../types/errors';

interface LoginCredentials {
    username: string;
    password: string;
}

interface RegisterData {
    username: string;
    password: string;
    confirmPassword: string;
}

interface AuthResponse {
    access_token: string;
    user: {
        id: number;
        username: string;
    };
}

export const authKeys = {
    all: ['auth'] as const,
    user: () => [...authKeys.all, 'user'] as const,
};

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: LoginCredentials): Promise<AuthResponse> => {
            return authAPI.login(credentials);
        },
        onSuccess: (data) => {
            localStorage.setItem('authToken', data.access_token);

            queryClient.invalidateQueries({ queryKey: authKeys.user() });

            navigate('/');
        },
        onError: (error: AxiosError<ApiError>) => {
            console.error('Login error:', getErrorMessage(error));
        },
    });
};

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (userData: RegisterData) => {
            return authAPI.register(userData);
        },
        onSuccess: () => {
            navigate('/login');
        },
        onError: (error: AxiosError<ApiError>) => {
            console.error('Registration error:', getErrorMessage(error));
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            authAPI.logout();
        },
        onSuccess: () => {
            localStorage.removeItem('authToken');

            queryClient.clear();

            window.location.href = '/';
        },
    });
};

export const useAuth = () => {
    const token = localStorage.getItem('authToken');

    return {
        isAuthenticated: !!token,
        token,
    };
};

export const useCurrentUser = () => {
    const { isAuthenticated } = useAuth();

    return useQuery({
        queryKey: authKeys.user(),
        queryFn: async () => {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('No token');

            return { token };
        },
        enabled: isAuthenticated,
        retry: false,
    });
};
