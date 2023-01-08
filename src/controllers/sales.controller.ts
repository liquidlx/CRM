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
import { Sales } from '@prisma/client';
import {
  GetSalesAttributes,
  PostSalesRequest,
  SalesQuery,
} from 'src/entities/requests';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SalesService } from 'src/services/sales.service';

@UseGuards(JwtAuthGuard)
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  async findAll(
    @Query() { filter }: SalesQuery,
  ): Promise<GetSalesAttributes[] | null> {
    const { storesId } = filter || {};
    const sales = await this.salesService.findAll({ deleted: false, storesId });

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
  async getCountSales(@Query() { filter }: SalesQuery): Promise<number> {
    const { storesId } = filter || {};
    return this.salesService.countSales({ deleted: false, storesId });
  }

  @Get('/revenue')
  async getRevenue(@Query() { filter }: SalesQuery): Promise<number> {
    const { storesId } = filter || {};
    return this.salesService.sumRevenue({ deleted: false, storesId });
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Sales | null> {
    return this.salesService.findById({ id, deleted: false });
  }
}
