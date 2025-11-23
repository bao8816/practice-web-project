import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { ErrorDisplay } from '../../components/error';
import { Card } from '../../components/ui';
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
        return <Navigate to="/" replace />;
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
                    <div className="profile-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <div className="form-display">{profile.fullName || 'Not provided'}</div>
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <div className="form-display">
                                {profile.gender
                                    ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)
                                    : 'Not provided'}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <div className="form-display">{formatDate(profile.dateOfBirth) || 'Not provided'}</div>
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <div className="form-display">{profile.phoneNumber || 'Not provided'}</div>
                        </div>

                        <div className="form-group">
                            <label>Avatar</label>
                            <div className="form-display">
                                {profile.avatarUrl ? (
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
                                )}
                            </div>
                        </div>
                    </div>
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
