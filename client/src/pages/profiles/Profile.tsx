import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from '../../components/layout';
import { ErrorDisplay } from '../../components/error';
import { Button, Input, Select, Card } from '../../components/ui';
import { useMyProfile, useUpdateMyProfile } from '../../hooks/profiles';
import { useApiError } from '../../hooks/error';
import { Gender, type UpdateProfileRequest } from '../../types/profile';
import type { AxiosError } from 'axios';
import './Profile.css';

export const Profile = () => {
    const { data: profile, isLoading, error, isError } = useMyProfile();
    const updateProfileMutation = useUpdateMyProfile();

    const [formData, setFormData] = useState<UpdateProfileRequest>({
        fullName: '',
        gender: undefined,
        dateOfBirth: '',
        phoneNumber: '',
        avatarUrl: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const validationApiError = useMemo(() => {
        if (validationErrors.length === 0) return null;

        return {
            statusCode: 400,
            timestamp: new Date().toISOString(),
            path: '/profile',
            method: 'PUT',
            message: validationErrors,
            error: 'Validation Error',
        };
    }, [validationErrors]);

    const updateApiError = useApiError({
        error: updateProfileMutation.error,
        fallbackMessage: 'Failed to update profile. Please try again.',
        path: '/profile',
        method: 'PUT',
        errorType: 'UpdateError',
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                fullName: profile.fullName || '',
                gender: profile.gender || undefined,
                dateOfBirth: profile.dateOfBirth || '',
                phoneNumber: profile.phoneNumber || '',
                avatarUrl: profile.avatarUrl || '',
            });
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: UpdateProfileRequest) => ({
            ...prev,
            [name]: value === '' ? undefined : value,
        }));

        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }

        if (updateProfileMutation.error) {
            updateProfileMutation.reset();
        }
    };

    const validateForm = (): string[] => {
        const errors: string[] = [];

        if (formData.fullName && formData.fullName.trim().length < 2) {
            errors.push('Full name must be at least 2 characters long');
        }

        if (formData.phoneNumber && !/^\+?[\d\s\-()]+$/.test(formData.phoneNumber)) {
            errors.push('Please enter a valid phone number');
        }

        if (formData.avatarUrl && !/^https?:\/\/.+/.test(formData.avatarUrl)) {
            errors.push('Avatar URL must be a valid HTTP/HTTPS URL');
        }

        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validateForm();
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        const cleanData: UpdateProfileRequest = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                cleanData[key as keyof UpdateProfileRequest] = value;
            }
        });

        try {
            await updateProfileMutation.mutateAsync(cleanData);
            setIsEditing(false);
            setValidationErrors([]);
        } catch (error) {
            console.error('Profile update failed:', error);
        }
    };

    const handleCancel = () => {
        if (profile) {
            setFormData({
                fullName: profile.fullName || '',
                gender: profile.gender || undefined,
                dateOfBirth: profile.dateOfBirth || '',
                phoneNumber: profile.phoneNumber || '',
                avatarUrl: profile.avatarUrl || '',
            });
        }
        setIsEditing(false);
        setValidationErrors([]);
        updateProfileMutation.reset();
    };

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    };

    const formatDateForInput = (dateString: string | undefined) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="profile-container">
                    <div className="profile-loading">Loading profile...</div>
                </div>
            </Layout>
        );
    }

    const profileExists = profile && !isError;
    const isNotFoundError = isError && (error as AxiosError)?.response?.status === 404;

    return (
        <Layout>
            <div className="profile-container">
                <div className="profile-header">
                    <h1>My Profile</h1>
                    {profileExists && !isEditing && (
                        <Button variant="primary" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </Button>
                    )}
                </div>

                {validationApiError && (
                    <ErrorDisplay error={validationApiError} onDismiss={() => setValidationErrors([])} compact />
                )}

                {updateApiError && (
                    <ErrorDisplay
                        error={updateApiError}
                        onDismiss={() => updateProfileMutation.reset()}
                        onRetry={() => updateProfileMutation.mutate(formData)}
                        compact
                    />
                )}

                {isNotFoundError && (
                    <Card variant="outlined" padding="md" className="profile-not-found">
                        <h2>Create Your Profile</h2>
                        <p>You don't have a profile yet. Fill out the form below to create one.</p>
                    </Card>
                )}

                <Card variant="elevated" padding="lg">
                    <form onSubmit={handleSubmit} className="profile-form">
                        {isEditing || isNotFoundError ? (
                            <Input
                                label="Full Name"
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                            />
                        ) : (
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="form-display">{profile?.fullName || 'Not provided'}</div>
                            </div>
                        )}

                        {isEditing || isNotFoundError ? (
                            <Select
                                label="Gender"
                                id="gender"
                                name="gender"
                                value={formData.gender || ''}
                                onChange={handleChange}
                                options={[
                                    { value: '', label: 'Select gender' },
                                    { value: Gender.MALE, label: 'Male' },
                                    { value: Gender.FEMALE, label: 'Female' },
                                    { value: Gender.OTHER, label: 'Other' },
                                ]}
                            />
                        ) : (
                            <div className="form-group">
                                <label>Gender</label>
                                <div className="form-display">
                                    {profile?.gender
                                        ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)
                                        : 'Not provided'}
                                </div>
                            </div>
                        )}

                        {isEditing || isNotFoundError ? (
                            <Input
                                label="Date of Birth"
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formatDateForInput(formData.dateOfBirth)}
                                onChange={handleChange}
                            />
                        ) : (
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <div className="form-display">{formatDate(profile?.dateOfBirth) || 'Not provided'}</div>
                            </div>
                        )}

                        {isEditing || isNotFoundError ? (
                            <Input
                                label="Phone Number"
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />
                        ) : (
                            <div className="form-group">
                                <label>Phone Number</label>
                                <div className="form-display">{profile?.phoneNumber || 'Not provided'}</div>
                            </div>
                        )}

                        {isEditing || isNotFoundError ? (
                            <Input
                                label="Avatar URL"
                                type="url"
                                id="avatarUrl"
                                name="avatarUrl"
                                value={formData.avatarUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/avatar.jpg"
                            />
                        ) : (
                            <div className="form-group">
                                <label>Avatar URL</label>
                                <div className="form-display">
                                    {profile?.avatarUrl ? (
                                        <div className="avatar-display">
                                            <img
                                                src={profile.avatarUrl}
                                                alt="Avatar"
                                                className="avatar-preview"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                            <span className="avatar-url">
                                                <a href={`${profile.avatarUrl}`}>Avatar URL</a>
                                            </span>
                                        </div>
                                    ) : (
                                        'Not provided'
                                    )}
                                </div>
                            </div>
                        )}

                        {(isEditing || isNotFoundError) && (
                            <div className="form-actions">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={updateProfileMutation.isPending}
                                    disabled={updateProfileMutation.isPending}
                                >
                                    {isNotFoundError ? 'Create Profile' : 'Save Changes'}
                                </Button>
                                {isEditing && (
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={handleCancel}
                                        disabled={updateProfileMutation.isPending}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        )}
                    </form>
                </Card>

                {profileExists && (
                    <Card variant="outlined" padding="md" className="profile-metadata">
                        <div className="metadata-item">
                            <strong>Profile Created:</strong> {new Date(profile.createdAt).toLocaleDateString()}
                        </div>
                        <div className="metadata-item">
                            <strong>Last Updated:</strong> {new Date(profile.updatedAt).toLocaleDateString()}
                        </div>
                    </Card>
                )}
            </div>
        </Layout>
    );
};
