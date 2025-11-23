import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { ErrorDisplay } from '../../components/error';
import { Button, Input, Select, Card, Field } from '../../components/ui';
import { useMyProfile, useUpdateMyProfile } from '../../hooks/profiles';
import { useApiError } from '../../hooks/error';
import { Gender, type UpdateProfileRequest } from '../../types/profile';
import './Profile.css';

export const MyProfileEdit = () => {
    const navigate = useNavigate();
    const { data: profile, isLoading } = useMyProfile();
    const updateProfileMutation = useUpdateMyProfile();

    const [formData, setFormData] = useState<UpdateProfileRequest>({
        fullName: '',
        gender: undefined,
        dateOfBirth: '',
        phoneNumber: '',
        avatarUrl: '',
    });

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const validationApiError = useMemo(() => {
        if (validationErrors.length === 0) return null;

        return {
            statusCode: 400,
            timestamp: new Date().toISOString(),
            path: '/profiles/me',
            method: 'PUT',
            message: validationErrors,
            error: 'Validation Error',
        };
    }, [validationErrors]);

    const updateApiError = useApiError({
        error: updateProfileMutation.error,
        fallbackMessage: 'Failed to update profile. Please try again.',
        path: '/profiles/me',
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
            navigate('/profiles/me');
        } catch (error) {
            console.error('Profile update failed:', error);
        }
    };

    const handleCancel = () => {
        navigate('/profiles/me');
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

    return (
        <Layout>
            <div className="profile-container">
                <div className="profile-header">
                    <h1>Edit Profile</h1>
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

                <Card variant="elevated" padding="lg">
                    <form onSubmit={handleSubmit} className="profile-form">
                        <Field label="Full Name">
                            <Input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                            />
                        </Field>

                        <Field label="Gender">
                            <Select
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
                        </Field>

                        <Field label="Date of Birth">
                            <Input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formatDateForInput(formData.dateOfBirth)}
                                onChange={handleChange}
                            />
                        </Field>

                        <Field label="Phone Number">
                            <Input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />
                        </Field>

                        <Field label="Avatar URL">
                            <Input
                                type="url"
                                id="avatarUrl"
                                name="avatarUrl"
                                value={formData.avatarUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/avatar.jpg"
                            />
                        </Field>

                        <div className="form-actions">
                            <Button
                                type="submit"
                                variant="primary"
                                loading={updateProfileMutation.isPending}
                                disabled={updateProfileMutation.isPending}
                            >
                                Save Changes
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleCancel}
                                disabled={updateProfileMutation.isPending}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
};
