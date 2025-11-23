import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { ErrorDisplay } from '../../components/error';
import { Button, Card } from '../../components/ui';
import { useMyProfile } from '../../hooks/profiles';
import { useApiError } from '../../hooks/error';
import type { AxiosError } from 'axios';
import './Profile.css';

export const MyProfile = () => {
    const navigate = useNavigate();
    const { data: profile, isLoading, error, isError } = useMyProfile();

    const apiError = useApiError({
        error: error,
        fallbackMessage: 'Failed to load profile. Please try again.',
        path: '/profiles/me',
        method: 'GET',
        errorType: 'ProfileError',
    });

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

    const isNotFoundError = isError && (error as AxiosError)?.response?.status === 404;

    if (isError && !isNotFoundError) {
        return (
            <Layout>
                <div className="profile-container">{apiError && <ErrorDisplay error={apiError} />}</div>
            </Layout>
        );
    }

    if (isNotFoundError) {
        return (
            <Layout>
                <div className="profile-container">
                    <Card variant="outlined" padding="md" className="profile-not-found">
                        <h2>Create Your Profile</h2>
                        <p>You don't have a profile yet.</p>
                        <Button variant="primary" onClick={() => navigate('/profiles/me/edit')}>
                            Create Profile
                        </Button>
                    </Card>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="profile-container">
                <div className="profile-header">
                    <h1>My Profile</h1>
                    <Button variant="primary" onClick={() => navigate('/profiles/me/edit')}>
                        Edit Profile
                    </Button>
                </div>

                <Card variant="elevated" padding="lg">
                    <div className="profile-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <div className={`form-display ${!profile?.fullName ? 'empty' : ''}`}>
                                {profile?.fullName || 'Not provided'}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <div className={`form-display ${!profile?.gender ? 'empty' : ''}`}>
                                {profile?.gender
                                    ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)
                                    : 'Not provided'}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <div className={`form-display ${!profile?.dateOfBirth ? 'empty' : ''}`}>
                                {formatDate(profile?.dateOfBirth) || 'Not provided'}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <div className={`form-display ${!profile?.phoneNumber ? 'empty' : ''}`}>
                                {profile?.phoneNumber || 'Not provided'}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Avatar URL</label>
                            <div className={`form-display ${!profile?.avatarUrl ? 'empty' : ''}`}>
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
                    </div>
                </Card>

                {profile && (
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
