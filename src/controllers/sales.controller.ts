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
import { Sales } from '@prisma/client';
import { PostSalesRequest } from 'src/entities/requests';
import { SalesService } from 'src/services/sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get(':id')
  async find(@Param('id') id: string): Promise<Sales | null> {
    return this.salesService.findById({ id });
  }

  @Get()
  async findAll(): Promise<Sales[] | null> {
    return this.salesService.findAll({});
  }

  @Post()
  async create(@Body() body: PostSalesRequest): Promise<Sales> {
    const { data } = body;
    return this.salesService.create(data);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<Sales | null> {
    return this.salesService.delete({ id });
  }

  @Patch()
  async update(@Body() body: PostSalesRequest): Promise<Sales | null> {
    const { data } = body;
    return this.salesService.update(data);
  }
}
