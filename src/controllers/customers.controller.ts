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
import { Customers } from '@prisma/client';
import { PostCustomersAttributes } from 'src/entities/requests';
import { CustomersService } from 'src/services';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  async find(@Param('id') id: string): Promise<Customers | null> {
    return this.customersService.findOne({ id });
  }

  @Get()
  async findAll(): Promise<Customers[] | null> {
    return this.customersService.findAll({});
  }

  @Post()
  async create(@Body() body: PostCustomersAttributes): Promise<Customers> {
    const { data } = body;
    return this.customersService.create(data);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<Customers | null> {
    return this.customersService.delete({ id });
  }

  @Patch()
  async update(
    @Body() body: PostCustomersAttributes,
  ): Promise<Customers | null> {
    const { data } = body;
    return this.customersService.update(data);
  }
}
