import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { ErrorDisplay } from '../../components/error';
import { Button, Input, Card } from '../../components/ui';
import './Auth.css';
import { useAuth, useRegister } from '../../hooks/auth';
import { useApiError } from '../../hooks/error';

export const Register = () => {
    const { isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const registerMutation = useRegister();

    const apiError = useApiError({
        error: registerMutation.error,
        fallbackMessage: 'Registration failed. Please try again.',
        path: '/auth/register',
        method: 'POST',
        errorType: 'RegisterError',
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

        if (registerMutation.error) {
            registerMutation.reset();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        registerMutation.mutate(formData);
    };

    return (
        <Layout headerVariant="compact">
            <div className="auth-container">
                <Card variant="gradient-border" padding="lg" className="auth-card">
                    <div className="auth-header">
                        <h2 className="auth-title">Create Account</h2>
                        <p className="auth-subtitle">Join ShopSmart today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {apiError && (
                            <ErrorDisplay
                                error={apiError}
                                onDismiss={() => registerMutation.reset()}
                                onRetry={() => registerMutation.mutate(formData)}
                            />
                        )}

                        <Input
                            label="Username"
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choose a username"
                            autoComplete="username"
                            disabled={registerMutation.isPending}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            disabled={registerMutation.isPending}
                            required
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            disabled={registerMutation.isPending}
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            loading={registerMutation.isPending}
                            fullWidth
                        >
                            Create Account
                        </Button>
                    </form>

                    <div className="auth-footer">
                        <p className="auth-link-text">
                            Already have an account?{' '}
                            <Link to="/login" className="auth-link">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};
