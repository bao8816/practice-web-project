import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Addresses } from './addresses.entity';
import { Repository } from 'typeorm';
import { AppException } from '../shared/exceptions/exceptions';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ValidationService } from '../shared/services/validation.service';

@Injectable()
export class AddressesService {
    constructor(
        @InjectRepository(Addresses)
        private readonly addressesRepository: Repository<Addresses>,
        private readonly validationService: ValidationService,
    ) {}

    private async validateAddressOwnership(
        addressId: number,
        requestingUserId: number,
        action: string,
    ): Promise<Addresses> {
        const address = await this.findOne(addressId);
        if (address.userId !== requestingUserId) {
            throw AppException.Forbidden(`You do not have permission to ${action} this address`);
        }
        return address;
    }

    async findAll(): Promise<Addresses[]> {
        return this.addressesRepository.find();
    }

    async findOne(id: number): Promise<Addresses> {
        const address = await this.addressesRepository.findOne({
            where: { id },
        });

        if (!address) {
            throw AppException.NotFound('Address not found');
        }

        return address;
    }

    async findByUserId(userId: number): Promise<Addresses[]> {
        // Validate user exists first using ValidationService
        await this.validationService.validateUserExists(userId);

        return this.addressesRepository.find({
            where: { userId },
        });
    }

    async createAddress(createAddressDto: CreateAddressDto): Promise<Addresses> {
        // Validate user exists using ValidationService
        await this.validationService.validateUserExists(createAddressDto.userId);

        const address = this.addressesRepository.create(createAddressDto);
        return this.addressesRepository.save(address);
    }

    async updateAddress(id: number, updateAddressDto: UpdateAddressDto, requestingUserId?: number): Promise<Addresses> {
        let address: Addresses;

        if (requestingUserId !== undefined) {
            address = await this.validateAddressOwnership(id, requestingUserId, 'update');
        } else {
            address = await this.findOne(id);
        }

        Object.assign(address, updateAddressDto);
        return this.addressesRepository.save(address);
    }

    async deleteAddress(id: number, requestingUserId?: number): Promise<void> {
        let address: Addresses;

        if (requestingUserId !== undefined) {
            address = await this.validateAddressOwnership(id, requestingUserId, 'delete');
        } else {
            address = await this.findOne(id);
        }

        await this.addressesRepository.remove(address);
    }
}
