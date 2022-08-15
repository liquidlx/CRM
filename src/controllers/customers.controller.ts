import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Customers } from '@prisma/client';
import { filter } from 'rxjs';
import { PostCustomersAttributes, QueryCustomers } from 'src/entities/requests';
import { CustomersService } from 'src/services';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async findAll(@Query() query: any): Promise<Customers[] | null> {
    let { filter } = query;
    filter = JSON.parse(filter);

    console.log(query);
    return this.customersService.findAll(filter || {});
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

  @Get('/count')
  async getCountCustomers(): Promise<number> {
    return this.customersService.countCustomers();
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Customers | null> {
    return this.customersService.findOne({ id });
  }
}
