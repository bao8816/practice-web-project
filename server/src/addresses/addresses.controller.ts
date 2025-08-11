import { Controller, Get, Param, UseGuards, Request, Post, Body, Put, Delete } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Addresses } from './addresses.entity';
import { AuthRequest } from '../shared/interfaces';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AppException } from '../shared/exceptions/exceptions';
import { CustomParseIntPipe } from '../shared/pipes/custom-parse-int.pipe';

@Controller('addresses')
export class AddressesController {
    constructor(private readonly addressesService: AddressesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllAddresses(): Promise<Addresses[]> {
        return this.addressesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id', CustomParseIntPipe) id: number): Promise<Addresses> {
        return this.addressesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user/:userId')
    async getByUserId(@Param('userId', CustomParseIntPipe) userId: number): Promise<Addresses[]> {
        return this.addressesService.findByUserId(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user/me')
    async getMyAddresses(@Request() req: AuthRequest): Promise<Addresses[]> {
        const userId = req.user.id;
        return this.addressesService.findByUserId(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createAddress(@Request() req: AuthRequest, @Body() createAddressDto: CreateAddressDto): Promise<Addresses> {
        if (!createAddressDto.userId) {
            createAddressDto.userId = req.user.id;
        }

        if (!createAddressDto.recipientName) {
            createAddressDto.recipientName = req.user.username;
        }

        return this.addressesService.createAddress(createAddressDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('user/me')
    async createMyAddress(@Request() req: AuthRequest, @Body() createAddressDto: CreateAddressDto): Promise<Addresses> {
        createAddressDto.userId = req.user.id;
        createAddressDto.recipientName = req.user.username;

        return this.addressesService.createAddress(createAddressDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateAddress(
        @Param('id', CustomParseIntPipe) id: number,
        @Body() updateAddressDto: UpdateAddressDto,
        @Request() req: AuthRequest,
    ): Promise<Addresses> {
        const address = await this.addressesService.findOne(id);
        if (address.userId !== req.user.id) {
            throw AppException.Forbidden('You do not have permission to update this address');
        }

        return this.addressesService.updateAddress(id, updateAddressDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteAddress(@Param('id', CustomParseIntPipe) id: number, @Request() req: AuthRequest): Promise<void> {
        const address = await this.addressesService.findOne(id);
        if (address.userId !== req.user.id) {
            throw AppException.Forbidden('You do not have permission to delete this address');
        }

        return this.addressesService.deleteAddress(id);
    }
}
