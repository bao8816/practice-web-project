import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { ErrorDisplay } from '../../components/error';
import { Button, Input, Card } from '../../components/ui';
import './Auth.css';
import { useAuth, useLogin } from '../../hooks/auth';
import { useApiError } from '../../hooks/error';

export const Login = () => {
    const { isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const loginMutation = useLogin();

    const apiError = useApiError({
        error: loginMutation.error,
        fallbackMessage: 'Login failed. Please try again.',
        path: '/auth/login',
        method: 'POST',
        errorType: 'LoginError',
    });

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate(formData);
    };

    return (
        <Layout headerVariant="compact">
            <div className="auth-container">
                <Card variant="gradient-border" padding="lg" className="auth-card">
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

                        <Input
                            label="Username"
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            autoComplete="username"
                            disabled={loginMutation.isPending}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            disabled={loginMutation.isPending}
                            required
                        />

                        <Button type="submit" variant="primary" size="lg" loading={loginMutation.isPending} fullWidth>
                            Sign In
                        </Button>
                    </form>

                    <div className="auth-footer">
                        <p className="auth-link-text">
                            Don't have an account?{' '}
                            <Link to="/register" className="auth-link">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};
