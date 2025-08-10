import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Addresses } from './addresses.entity';
import { Repository } from 'typeorm';
import { AppException } from '../shared/exceptions/exceptions';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
    constructor(
        @InjectRepository(Addresses)
        private readonly addressesRepository: Repository<Addresses>,
    ) {}

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
        return this.addressesRepository.find({
            where: { userId },
        });
    }

    async createAddress(createAddressDto: CreateAddressDto): Promise<Addresses> {
        const address = this.addressesRepository.create(createAddressDto);

        return this.addressesRepository.save(address);
    }

    async updateAddress(id: number, updateAddressDto: UpdateAddressDto): Promise<Addresses> {
        const address = await this.findOne(id);
        const updatedAddress = Object.assign(address, updateAddressDto);

        return this.addressesRepository.save(updatedAddress);
    }

    async deleteAddress(id: number): Promise<void> {
        const address = await this.findOne(id);
        await this.addressesRepository.remove(address);
    }
}
