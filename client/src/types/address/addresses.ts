export interface AddressData {
    name?: string;
    recipientName: string;
    streetAddress: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    phoneNumber?: string;
    isDefaultShipping?: boolean;
    isDefaultBilling?: boolean;
}

export interface AddressResponse {
    id: number;
    userId: number;
    name?: string;
    recipientName: string;
    streetAddress: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    phoneNumber?: string;
    isDefaultShipping: boolean;
    isDefaultBilling: boolean;
    createdAt: string;
    updatedAt: string;
}

// Request types
export interface CreateAddressRequest {
    name?: string;
    recipientName: string;
    streetAddress: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    phoneNumber?: string;
    isDefaultShipping?: boolean;
    isDefaultBilling?: boolean;
}

export interface UpdateAddressRequest {
    name?: string;
    recipientName?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    phoneNumber?: string;
    isDefaultShipping?: boolean;
    isDefaultBilling?: boolean;
}
