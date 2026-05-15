import { AddressResponse, CreateAddressRequest, UpdateAddressRequest } from '../types/address/addresses';
import { apiClient } from './api';

export const addressesAPI = {
    getMyAddresses: async (): Promise<AddressResponse> => {
        const response = await apiClient.get<AddressResponse>('/addresses/me');
        return response.data;
    },

    updateMyAddresses: async (data: UpdateAddressRequest): Promise<AddressResponse> => {
        const response = await apiClient.put<AddressResponse>('/addresses/me', data);
        return response.data;
    },

    getAddress: async (userId: number): Promise<AddressResponse> => {
        const response = await apiClient.get<AddressResponse>(`/addresses/user/${userId}`);
        return response.data;
    },

    updateProfile: async (userId: number, data: UpdateAddressRequest): Promise<AddressResponse> => {
        const response = await apiClient.put<AddressResponse>(`/addresses/user/${userId}`, data);
        return response.data;
    },

    createProfile: async (userId: number, data: CreateAddressRequest): Promise<AddressResponse> => {
        const response = await apiClient.post<AddressResponse>(`/addresses/user/${userId}`, data);
        return response.data;
    },

    deleteProfile: async (userId: number): Promise<void> => {
        await apiClient.delete(`/addresses/${userId}`);
    },

    getAllAddresses: async (): Promise<AddressResponse[]> => {
        const response = await apiClient.get<AddressResponse[]>('/addresses');
        return response.data;
    },
};
