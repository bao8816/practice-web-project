import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { ErrorDisplay } from '../../components/error';
import { Card, Field } from '../../components/ui';
import { useProfile } from '../../hooks/profiles';
import { useApiError } from '../../hooks/error';
import './Profile.css';

export const UserProfile = () => {
    const { userId } = useParams<{ userId: string }>();

    const { data: profile, isLoading, error, isError } = useProfile(userId ? Number(userId) : 0);

    const apiError = useApiError({
        error: error,
        fallbackMessage: 'Failed to load profile. Please try again.',
        path: `/profiles/${userId}`,
        method: 'GET',
        errorType: 'ProfileError',
    });

    if (!userId) {
        return <Navigate to="/profiles/me" replace />;
    }

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
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

    if (isError || !profile) {
        return (
            <Layout>
                <div className="profile-container">{apiError && <ErrorDisplay error={apiError} />}</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="profile-container">
                <div className="profile-header">
                    <h1>{profile.fullName || 'User Profile'}</h1>
                </div>

                <Card variant="elevated" padding="lg">
                    <Field label="Full Name" value={profile.fullName || 'Not provided'} empty={!profile.fullName} />

                    <Field
                        label="Gender"
                        value={
                            profile.gender
                                ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)
                                : 'Not provided'
                        }
                        empty={!profile.gender}
                    />

                    <Field
                        label="Date of Birth"
                        value={formatDate(profile.dateOfBirth) || 'Not provided'}
                        empty={!profile.dateOfBirth}
                    />

                    <Field
                        label="Phone Number"
                        value={profile.phoneNumber || 'Not provided'}
                        empty={!profile.phoneNumber}
                    />

                    <Field
                        label="Avatar"
                        value={
                            profile.avatarUrl ? (
                                <div className="avatar-display">
                                    <img
                                        src={profile.avatarUrl}
                                        alt="Avatar"
                                        className="avatar-preview"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                </div>
                            ) : (
                                'Not provided'
                            )
                        }
                        empty={!profile?.avatarUrl}
                    />
                </Card>

                <Card variant="outlined" padding="md" className="profile-metadata">
                    <div className="metadata-item">
                        <strong>Profile Created:</strong> {new Date(profile.createdAt).toLocaleDateString()}
                    </div>
                    <div className="metadata-item">
                        <strong>Last Updated:</strong> {new Date(profile.updatedAt).toLocaleDateString()}
                    </div>
                </Card>
            </div>
        </Layout>
    );
};
