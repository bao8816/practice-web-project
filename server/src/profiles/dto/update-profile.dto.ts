import { IsOptional, IsString, IsEnum, IsDateString, IsUrl } from 'class-validator';
import { Gender } from '../profiles.entity';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @IsOptional()
    @IsDateString()
    dateOfBirth?: Date;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsUrl()
    avatarUrl?: string;
}
