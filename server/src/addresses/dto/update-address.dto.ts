import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    recipientName?: string;

    @IsOptional()
    @IsString()
    streetAddress?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    state?: string;

    @IsOptional()
    @IsString()
    postalCode?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsBoolean()
    isDefaultShipping?: boolean;

    @IsOptional()
    @IsBoolean()
    isDefaultBilling?: boolean;
}
