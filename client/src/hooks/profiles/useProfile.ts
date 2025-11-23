import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profilesAPI } from '../../services';
import type { ProfileResponse, UpdateProfileRequest, CreateProfileRequest } from '../../types/profile';
import type { AxiosError } from 'axios';
import { getErrorMessage } from '../../types/errors';

export const profileKeys = {
    all: ['profiles'] as const,
    profile: (userId: number) => [...profileKeys.all, 'user-profile', userId] as const,
    myProfile: () => [...profileKeys.all, 'me'] as const,
};

export const useMyProfile = (enabled = true) => {
    return useQuery({
        queryKey: profileKeys.myProfile(),
        queryFn: async (): Promise<ProfileResponse> => {
            return profilesAPI.getMyProfile();
        },
        enabled: enabled && !!localStorage.getItem('authToken'),
        retry: (failureCount, error: AxiosError) => {
            if (error?.response?.status === 404) {
                return false;
            }
            return failureCount < 3;
        },
    });
};

export const useProfile = (userId: number) => {
    return useQuery({
        queryKey: profileKeys.profile(userId),
        queryFn: async (): Promise<ProfileResponse> => {
            return profilesAPI.getProfile(userId);
        },
        enabled: !!userId,
        retry: (failureCount, error: AxiosError) => {
            if (error?.response?.status === 404) {
                return false;
            }
            return failureCount < 3;
        },
    });
};

export const useAllProfiles = () => {
    return useQuery({
        queryKey: profileKeys.all,
        queryFn: async (): Promise<ProfileResponse[]> => {
            return profilesAPI.getAllProfiles();
        },
        retry: (failureCount, error: AxiosError) => {
            if (error?.response?.status === 404) {
                return false;
            }
            return failureCount < 3;
        },
    });
};

export const useUpdateMyProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateProfileRequest): Promise<ProfileResponse> => {
            return profilesAPI.updateMyProfile(data);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(profileKeys.myProfile(), data);
            queryClient.invalidateQueries({ queryKey: profileKeys.myProfile() });
        },
        onError: (error: AxiosError) => {
            console.error('Update my profile error:', getErrorMessage(error));
        },
    });
};

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
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: profileKeys.profile(data.userId) });
        },
        onError: (error: AxiosError) => {
            console.error('Update profile error:', getErrorMessage(error));
        },
    });
};

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
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: profileKeys.profile(data.userId) });
        },
        onError: (error: AxiosError) => {
            console.error('Profile update error:', getErrorMessage(error));
        },
    });
};

export const useDeleteProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userId: number): Promise<void> => {
            return profilesAPI.deleteProfile(userId);
        },
        onSuccess: (_data, userId) => {
            queryClient.removeQueries({ queryKey: profileKeys.profile(userId) });
        },
        onError: (error: AxiosError) => {
            console.error('Delete profile error:', getErrorMessage(error));
        },
    });
};
