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
import { GetSalesAttributes, PostSalesRequest } from 'src/entities/requests';
import { SalesService } from 'src/services/sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  async findAll(): Promise<GetSalesAttributes[] | null> {
    const sales = await this.salesService.findAll({});

    return sales.map(({ Customers, Sellers, ...sale }) => {
      return {
        ...sale,
        customersName: Customers.name,
        sellersName: Sellers.name,
      };
    });
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

  @Get('/count')
  async getCountSales(): Promise<number> {
    console.log('COUNT');
    return this.salesService.countSales({});
  }

  @Get('/revenue')
  async getRevenue(): Promise<number> {
    return this.salesService.sumRevenue({});
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Sales | null> {
    return this.salesService.findById({ id });
  }
}
