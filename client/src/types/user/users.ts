import { ProfileResponse } from '../profile';
import { AddressResponse } from '../address/addresses';

export interface UserResponse {
    id: number;
    username: string;
    role: string;
    email?: string;
    profile?: ProfileResponse;
    addresses?: AddressResponse[];
}
