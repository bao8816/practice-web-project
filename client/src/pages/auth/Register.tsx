import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { ErrorDisplay } from '../../components/error';
import './Auth.css';
import { useRegister } from '../../hooks/auth';
import { useApiError } from '../../hooks/error';

export const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const registerMutation = useRegister();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear API error when user types
        if (registerMutation.error) {
            registerMutation.reset();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Gửi thẳng request, để server handle validation
        registerMutation.mutate(formData);
    };

    // Use centralized error handling
    const apiError = useApiError({
        error: registerMutation.error,
        fallbackMessage: 'Registration failed. Please try again.',
        path: '/auth/register',
        method: 'POST',
        errorType: 'RegisterError',
    });

    return (
        <Layout headerVariant="compact">
            <div className="auth-container">
                <div className="auth-card">
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
                                // compact
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
                                placeholder="Choose a username"
                                autoComplete="username"
                                disabled={registerMutation.isPending}
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
                                placeholder="Create a password"
                                autoComplete="new-password"
                                disabled={registerMutation.isPending}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                disabled={registerMutation.isPending}
                            />
                        </div>

                        <button type="submit" disabled={registerMutation.isPending} className="auth-button">
                            {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p className="auth-link-text">
                            Already have an account?{' '}
                            <Link to="/login" className="auth-link">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
