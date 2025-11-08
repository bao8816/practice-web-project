// Profile-specific types
export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export interface ProfileData {
    fullName?: string;
    gender?: Gender;
    dateOfBirth?: string; // ISO date string
    phoneNumber?: string;
    avatarUrl?: string;
}

export interface ProfileResponse {
    id: number;
    userId: number;
    fullName?: string;
    gender?: Gender;
    dateOfBirth?: string;
    phoneNumber?: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
}

// Request types
export interface UpdateProfileRequest {
    fullName?: string;
    gender?: Gender;
    dateOfBirth?: string;
    phoneNumber?: string;
    avatarUrl?: string;
}

export interface CreateProfileRequest {
    fullName?: string;
    gender?: Gender;
    dateOfBirth?: string;
    phoneNumber?: string;
    avatarUrl?: string;
}
