import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useMyProfile, useUpdateMyProfile } from '../../hooks/profiles';
import type { AxiosError } from 'axios';
import { Gender, type UpdateProfileRequest } from '../../types/profiles';
import type { ApiError } from '../../types/api';
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

    // Update form data when profile loads
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

        // Clear validation errors when user starts typing
        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }

        // Clear mutation errors
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

        // Filter out empty strings and undefined values
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
            // Error is handled by the mutation's onError callback
            console.error('Profile update failed:', error);
        }
    };

    const handleCancel = () => {
        // Reset form data to original profile data
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

    // Handle case where profile doesn't exist yet
    const profileExists = profile && !isError;
    const isNotFoundError = isError && (error as AxiosError)?.response?.status === 404;

    return (
        <Layout>
            <div className="profile-container">
                <div className="profile-header">
                    <h1>My Profile</h1>
                    {profileExists && !isEditing && (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="edit-btn"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Show errors */}
                {validationErrors.length > 0 && (
                    <div className="error-container">
                        {validationErrors.map((error, index) => (
                            <div key={index} className="error-message">
                                {error}
                            </div>
                        ))}
                    </div>
                )}

                {updateProfileMutation.isError && (
                    <div className="error-container">
                        <div className="error-message">
                            {(updateProfileMutation.error as AxiosError<ApiError>)?.response?.data
                                ?.message || 'Failed to update profile. Please try again.'}
                        </div>
                    </div>
                )}

                {/* Profile not found - show create form */}
                {isNotFoundError && (
                    <div className="profile-not-found">
                        <h2>Create Your Profile</h2>
                        <p>You don't have a profile yet. Fill out the form below to create one.</p>
                    </div>
                )}

                {/* Profile form */}
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        {isEditing || isNotFoundError ? (
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                            />
                        ) : (
                            <div className="form-display">
                                {profile?.fullName || 'Not provided'}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        {isEditing || isNotFoundError ? (
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender || ''}
                                onChange={handleChange}
                            >
                                <option value="">Select gender</option>
                                <option value={Gender.MALE}>Male</option>
                                <option value={Gender.FEMALE}>Female</option>
                                <option value={Gender.OTHER}>Other</option>
                            </select>
                        ) : (
                            <div className="form-display">
                                {profile?.gender
                                    ? profile.gender.charAt(0).toUpperCase() +
                                      profile.gender.slice(1)
                                    : 'Not provided'}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        {isEditing || isNotFoundError ? (
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formatDateForInput(formData.dateOfBirth)}
                                onChange={handleChange}
                            />
                        ) : (
                            <div className="form-display">
                                {formatDate(profile?.dateOfBirth) || 'Not provided'}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        {isEditing || isNotFoundError ? (
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />
                        ) : (
                            <div className="form-display">
                                {profile?.phoneNumber || 'Not provided'}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="avatarUrl">Avatar URL</label>
                        {isEditing || isNotFoundError ? (
                            <input
                                type="url"
                                id="avatarUrl"
                                name="avatarUrl"
                                value={formData.avatarUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/avatar.jpg"
                            />
                        ) : (
                            <div className="form-display">
                                {profile?.avatarUrl ? (
                                    <div className="avatar-display">
                                        <img
                                            src={profile.avatarUrl}
                                            alt="Avatar"
                                            className="avatar-preview"
                                            onError={e => {
                                                (e.target as HTMLImageElement).style.display =
                                                    'none';
                                            }}
                                        />
                                        <span className="avatar-url">{profile.avatarUrl}</span>
                                    </div>
                                ) : (
                                    'Not provided'
                                )}
                            </div>
                        )}
                    </div>

                    {/* Form actions */}
                    {(isEditing || isNotFoundError) && (
                        <div className="form-actions">
                            <button
                                type="submit"
                                disabled={updateProfileMutation.isPending}
                                className="submit-btn"
                            >
                                {updateProfileMutation.isPending
                                    ? 'Saving...'
                                    : isNotFoundError
                                      ? 'Create Profile'
                                      : 'Save Changes'}
                            </button>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={updateProfileMutation.isPending}
                                    className="cancel-btn"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    )}
                </form>

                {/* Profile metadata */}
                {profileExists && (
                    <div className="profile-metadata">
                        <div className="metadata-item">
                            <strong>Profile Created:</strong>{' '}
                            {new Date(profile.createdAt).toLocaleDateString()}
                        </div>
                        <div className="metadata-item">
                            <strong>Last Updated:</strong>{' '}
                            {new Date(profile.updatedAt).toLocaleDateString()}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};
