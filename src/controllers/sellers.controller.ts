import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Sellers } from '@prisma/client';
import { PostSellersRequest } from 'src/entities/requests';
import { SellersService } from 'src/services/';

@Controller('sellers')
export class SellersConstroller {
  constructor(private readonly sellersService: SellersService) {}

  @Get(':id')
  async find(@Param('id') id: string): Promise<Sellers | null> {
    return this.sellersService.findById({ id });
  }

  @Get()
  async findAll(): Promise<Sellers[] | null> {
    return this.sellersService.findAll({});
  }

  @Post()
  async create(@Body() body: PostSellersRequest): Promise<Sellers> {
    const { data } = body;
    return this.sellersService.create(data);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<Sellers | null> {
    return this.sellersService.delete({ id });
  }

  @Patch()
  async update(@Body() body: PostSellersRequest): Promise<Sellers | null> {
    const { data } = body;
    return this.sellersService.update(data);
  }
}
