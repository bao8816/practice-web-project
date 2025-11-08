import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { ErrorDisplay } from '../../components/error';
import './Auth.css';
import { useLogin } from '../../hooks/auth';
import { useApiError } from '../../hooks/error';

export const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const loginMutation = useLogin();

    // Use centralized error handling
    const apiError = useApiError({
        error: loginMutation.error,
        fallbackMessage: 'Login failed. Please try again.',
        path: '/auth/login',
        method: 'POST',
        errorType: 'LoginError',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear API error when user types
        if (loginMutation.error) {
            loginMutation.reset();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate(formData);
    };

    return (
        <Layout headerVariant="compact">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2 className="auth-title">Welcome Back</h2>
                        <p className="auth-subtitle">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {apiError && (
                            <ErrorDisplay
                                error={apiError}
                                onDismiss={() => loginMutation.reset()}
                                onRetry={() => loginMutation.mutate(formData)}
                                compact
                            />
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
                        <button type="submit" disabled={loginMutation.isPending} className="auth-button">
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
