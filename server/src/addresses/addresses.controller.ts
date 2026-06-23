import { Controller, Get, Param, UseGuards, Request, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddressesService } from './addresses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Addresses } from './addresses.entity';
import { AuthRequest } from '../shared/interfaces';
import { CreateAddressDto, UpdateAddressDto } from './dto';
import { CustomParseIntPipe } from '../shared/pipes/custom-parse-int.pipe';

@ApiTags('addresses')
@ApiBearerAuth('jwt')
@Controller('addresses')
export class AddressesController {
    constructor(private readonly addressesService: AddressesService) {}

    @ApiOperation({ summary: 'List all addresses' })
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllAddresses(): Promise<Addresses[]> {
        return this.addressesService.findAll();
    }

    @ApiOperation({ summary: 'Get an address by ID' })
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id', CustomParseIntPipe) id: number): Promise<Addresses> {
        return this.addressesService.findOne(id);
    }

    @ApiOperation({ summary: 'List all addresses of a user' })
    @UseGuards(JwtAuthGuard)
    @Get('user/:userId')
    async getByUserId(@Param('userId', CustomParseIntPipe) userId: number): Promise<Addresses[]> {
        return this.addressesService.findByUserId(userId);
    }

    @ApiOperation({ summary: "List current user's addresses" })
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMyAddresses(@Request() req: AuthRequest): Promise<Addresses[]> {
        const userId = req.user.id;
        return this.addressesService.findByUserId(userId);
    }

    @ApiOperation({ summary: 'Create an address for current user' })
    @UseGuards(JwtAuthGuard)
    @Post()
    async createAddress(@Request() req: AuthRequest, @Body() createAddressDto: CreateAddressDto): Promise<Addresses> {
        createAddressDto.userId = req.user.id;

        if (!createAddressDto.recipientName) {
            createAddressDto.recipientName = req.user.username;
        }

        return this.addressesService.createAddress(createAddressDto);
    }

    @ApiOperation({ summary: 'Update an address by ID' })
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateAddress(
        @Param('id', CustomParseIntPipe) id: number,
        @Body() updateAddressDto: UpdateAddressDto,
        @Request() req: AuthRequest,
    ): Promise<Addresses> {
        return this.addressesService.updateAddress(id, updateAddressDto, req.user.id);
    }

    @ApiOperation({ summary: 'Delete an address by ID' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteAddress(@Param('id', CustomParseIntPipe) id: number, @Request() req: AuthRequest): Promise<void> {
        return this.addressesService.deleteAddress(id, req.user.id);
    }
}
