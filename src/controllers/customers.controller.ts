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
  UseGuards,
} from '@nestjs/common';
import { Customers } from '@prisma/client';
import { filter } from 'rxjs';
import { PostCustomersAttributes, QueryCustomers } from 'src/entities/requests';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CustomersService } from 'src/services';

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async findAll(@Query() query: QueryCustomers): Promise<Customers[] | null> {
    const { filter } = query;
    const { storesId, ...customerFilter } = filter;

    return this.customersService.findAll(
      { ...customerFilter, deleted: false } || {},
    );
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
    return this.customersService.findOne({ id, deleted: false });
  }
}
