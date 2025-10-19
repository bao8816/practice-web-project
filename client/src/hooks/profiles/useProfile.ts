import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profilesAPI } from '../../services';
import type { AxiosError } from 'axios';
import type {
    ProfileData,
    ProfileResponse,
    Gender,
    UpdateProfileRequest,
    CreateProfileRequest,
} from '../../types/profiles';
import type { ApiError } from '../../types/api';

// Re-export types for convenience
export type { ProfileData, ProfileResponse, Gender, UpdateProfileRequest, CreateProfileRequest };

export const profileKeys = {
    all: ['profiles'] as const,
    profile: (userId: number) => [...profileKeys.all, 'profile', userId] as const,
    myProfile: () => [...profileKeys.all, 'my-profile'] as const,
};

// Hook to get current user's profile
export const useMyProfile = () => {
    return useQuery({
        queryKey: profileKeys.myProfile(),
        queryFn: async (): Promise<ProfileResponse> => {
            return profilesAPI.getMyProfile();
        },
        retry: (failureCount, error: AxiosError<ApiError>) => {
            // Don't retry if profile doesn't exist (404)
            if (error?.response?.status === 404) {
                return false;
            }
            return failureCount < 3;
        },
    });
};

// Hook to get specific user's profile
export const useProfile = (userId: number) => {
    return useQuery({
        queryKey: profileKeys.profile(userId),
        queryFn: async (): Promise<ProfileResponse> => {
            return profilesAPI.getProfile(userId);
        },
        enabled: !!userId,
        retry: (failureCount, error: AxiosError<ApiError>) => {
            // Don't retry if profile doesn't exist (404)
            if (error?.response?.status === 404) {
                return false;
            }
            return failureCount < 3;
        },
    });
};

// Hook to update current user's profile
export const useUpdateMyProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateProfileRequest): Promise<ProfileResponse> => {
            return profilesAPI.updateMyProfile(data);
        },
        onSuccess: data => {
            // Update the cached profile data
            queryClient.setQueryData(profileKeys.myProfile(), data);
            // Also invalidate to refetch if needed
            queryClient.invalidateQueries({ queryKey: profileKeys.myProfile() });
        },
        onError: (error: AxiosError<ApiError>) => {
            console.error('Update my profile error:', error);
        },
    });
};

// Hook to update specific user's profile
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            userId,
            data,
        }: {
            userId: number;
            data: UpdateProfileRequest;
        }): Promise<ProfileResponse> => {
            return profilesAPI.updateProfile(userId, data);
        },
        onSuccess: data => {
            // Invalidate and refetch profile data
            queryClient.invalidateQueries({ queryKey: profileKeys.profile(data.userId) });
        },
        onError: (error: AxiosError<ApiError>) => {
            console.error('Update profile error:', error);
        },
    });
};

// Hook to create profile for specific user (admin only)
export const useCreateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            userId,
            data,
        }: {
            userId: number;
            data?: CreateProfileRequest;
        }): Promise<ProfileResponse> => {
            return profilesAPI.createProfile(userId, data);
        },
        onSuccess: data => {
            // Invalidate and refetch profile data
            queryClient.invalidateQueries({ queryKey: profileKeys.profile(data.userId) });
        },
        onError: (error: AxiosError<ApiError>) => {
            console.error('Create profile error:', error);
        },
    });
};

// Hook to delete profile
export const useDeleteProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userId: number): Promise<void> => {
            return profilesAPI.deleteProfile(userId);
        },
        onSuccess: (_data, userId) => {
            // Remove the profile from cache
            queryClient.removeQueries({ queryKey: profileKeys.profile(userId) });
        },
        onError: (error: AxiosError<ApiError>) => {
            console.error('Delete profile error:', error);
        },
    });
};
