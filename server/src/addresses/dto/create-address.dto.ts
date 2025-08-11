import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
    @IsString()
    userId: number;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    recipientName: string;

    @IsString()
    streetAddress: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    postalCode: string;

    @IsString()
    country: string;

    @IsString()
    phoneNumber: string;

    @IsBoolean()
    isDefaultShipping: boolean;

    @IsBoolean()
    isDefaultBilling: boolean;
}
