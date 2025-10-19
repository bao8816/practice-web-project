import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import './Auth.css';
import { useRegister } from '../../hooks/auth';
import type { AxiosError } from 'axios';

export const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const registerMutation = useRegister();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (registerMutation.error) {
            registerMutation.reset();
        }
    };

    const validateForm = (): string[] => {
        const newErrors: string[] = [];

        if (!formData.username.trim()) {
            newErrors.push('Username is required');
        }

        if (!formData.password) {
            newErrors.push('Password is required');
        } else if (formData.password.length < 4) {
            newErrors.push('Password must be at least 4 characters long');
        }

        if (!formData.confirmPassword) {
            newErrors.push('Please confirm your password');
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.push('Passwords do not match');
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            return;
        }

        registerMutation.mutate(formData);
    };

    const getErrorMessage = () => {
        if (!registerMutation.error) return null;

        const error = registerMutation.error as AxiosError<{ message?: string }>;
        if (error.response?.data?.message) {
            return error.response.data.message;
        }
        if (error.message) {
            return error.message;
        }
        return 'Registration failed. Please try again.';
    };

    const validationErrors = validateForm();
    const hasValidationErrors =
        formData.username !== '' || formData.password !== '' || formData.confirmPassword !== ''
            ? validationErrors
            : [];

    return (
        <Layout headerVariant="compact">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2 className="auth-title">Create Account</h2>
                        <p className="auth-subtitle">Join ShopSmart today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {(hasValidationErrors.length > 0 || registerMutation.error) && (
                            <div className="auth-errors">
                                {hasValidationErrors.map((error, index) => (
                                    <p key={index} className="error-message">
                                        {error}
                                    </p>
                                ))}
                                {registerMutation.error && (
                                    <p className="error-message">{getErrorMessage()}</p>
                                )}
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

                        {registerMutation.error && (
                            <div className="error-message">{registerMutation.error.message}</div>
                        )}

                        <button
                            type="submit"
                            disabled={registerMutation.isPending || hasValidationErrors.length > 0}
                            className="auth-button"
                        >
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
