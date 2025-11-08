import { apiClient } from './api';
import type { ProfileResponse, UpdateProfileRequest, CreateProfileRequest } from '../types/profile';

// Profile API functions
export const profilesAPI = {
    // Get current user's profile
    getMyProfile: async (): Promise<ProfileResponse> => {
        const response = await apiClient.get<ProfileResponse>('/profiles/me');
        return response.data;
    },

    // Update current user's profile
    updateMyProfile: async (data: UpdateProfileRequest): Promise<ProfileResponse> => {
        const response = await apiClient.put<ProfileResponse>('/profiles/me', data);
        return response.data;
    },

    // Get specific user profile (admin or public)
    getProfile: async (userId: number): Promise<ProfileResponse> => {
        const response = await apiClient.get<ProfileResponse>(`/profiles/${userId}`);
        return response.data;
    },

    // Update specific user profile (admin or self)
    updateProfile: async (userId: number, data: UpdateProfileRequest): Promise<ProfileResponse> => {
        const response = await apiClient.put<ProfileResponse>(`/profiles/${userId}`, data);
        return response.data;
    },

    // Create profile for specific user (admin only)
    createProfile: async (userId: number, data?: CreateProfileRequest): Promise<ProfileResponse> => {
        const response = await apiClient.post<ProfileResponse>(`/profiles/${userId}`, data);
        return response.data;
    },

    // Delete specific user profile (admin or self)
    deleteProfile: async (userId: number): Promise<void> => {
        await apiClient.delete(`/profiles/${userId}`);
    },

    // Get all profiles (admin only)
    getAllProfiles: async (): Promise<ProfileResponse[]> => {
        const response = await apiClient.get<ProfileResponse[]>('/profiles');
        return response.data;
    },
};
