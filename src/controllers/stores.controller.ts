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
import { Stores } from '@prisma/client';
import { PostStoresRequest } from 'src/entities/requests';
import { StoresService } from 'src/services';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get(':id')
  async find(@Param('id') id: string): Promise<Stores | null> {
    return this.storesService.findOne({ id });
  }

  @Get()
  async findAll(): Promise<Stores[] | null> {
    return this.storesService.findAll({});
  }

  @Post()
  async create(@Body() body: PostStoresRequest): Promise<Stores> {
    const { data } = body;
    return this.storesService.create(data);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<Stores | null> {
    return this.storesService.delete({ id });
  }

  @Patch()
  async update(@Body() body: PostStoresRequest): Promise<Stores | null> {
    const { data } = body;
    return this.storesService.update(data);
  }
}
