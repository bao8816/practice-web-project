import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import './Auth.css';
import { useLogin } from '../../hooks/auth';
import type { AxiosError } from 'axios';

export const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const loginMutation = useLogin();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (loginMutation.error) {
            loginMutation.reset();
        }
    };

    const validateForm = (): string[] => {
        const newErrors: string[] = [];

        if (!formData.username.trim()) {
            newErrors.push('Username is required');
        }

        if (!formData.password) {
            newErrors.push('Password is required');
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            // For validation errors, we still use local state
            // But for API errors, we use React Query's error handling
            return;
        }

        loginMutation.mutate(formData);
    };

    const getErrorMessage = () => {
        if (!loginMutation.error) return null;

        const error = loginMutation.error as AxiosError<{ message?: string }>;
        if (error.response?.data?.message) {
            return error.response.data.message;
        }
        if (error.message) {
            return error.message;
        }
        return 'Login failed. Please try again.';
    };

    const validationErrors = validateForm();
    const hasValidationErrors = formData.username !== '' || formData.password !== '' ? validationErrors : [];

    return (
        <Layout headerVariant="compact">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2 className="auth-title">Welcome Back</h2>
                        <p className="auth-subtitle">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {(hasValidationErrors.length > 0 || loginMutation.error) && (
                            <div className="auth-errors">
                                {hasValidationErrors.map((error, index) => (
                                    <p key={index} className="error-message">
                                        {error}
                                    </p>
                                ))}
                                {loginMutation.error && <p className="error-message">{getErrorMessage()}</p>}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter your username"
                                autoComplete="username"
                                disabled={loginMutation.isPending}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                disabled={loginMutation.isPending}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loginMutation.isPending || hasValidationErrors.length > 0}
                            className="auth-button"
                        >
                            {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p className="auth-link-text">
                            Don't have an account?{' '}
                            <Link to="/register" className="auth-link">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
