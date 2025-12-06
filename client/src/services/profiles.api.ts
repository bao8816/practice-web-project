import { apiClient } from './api';
import type { ProfileResponse, UpdateProfileRequest, CreateProfileRequest } from '../types/profile';

export const profilesAPI = {
    getMyProfile: async (): Promise<ProfileResponse> => {
        const response = await apiClient.get<ProfileResponse>('/profiles/me');
        return response.data;
    },

    updateMyProfile: async (data: UpdateProfileRequest): Promise<ProfileResponse> => {
        const response = await apiClient.put<ProfileResponse>('/profiles/me', data);
        return response.data;
    },

    getProfile: async (userId: number): Promise<ProfileResponse> => {
        const response = await apiClient.get<ProfileResponse>(`/profiles/${userId}`);
        return response.data;
    },

    updateProfile: async (userId: number, data: UpdateProfileRequest): Promise<ProfileResponse> => {
        const response = await apiClient.put<ProfileResponse>(`/profiles/${userId}`, data);
        return response.data;
    },

    createProfile: async (userId: number, data?: CreateProfileRequest): Promise<ProfileResponse> => {
        const response = await apiClient.post<ProfileResponse>(`/profiles/${userId}`, data);
        return response.data;
    },

    deleteProfile: async (userId: number): Promise<void> => {
        await apiClient.delete(`/profiles/${userId}`);
    },

    getAllProfiles: async (): Promise<ProfileResponse[]> => {
        const response = await apiClient.get<ProfileResponse[]>('/profiles');
        return response.data;
    },
};
