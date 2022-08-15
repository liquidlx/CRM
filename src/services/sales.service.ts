import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, Sales } from '@prisma/client';
import { SalesDto } from '../../src/entities/dtos';
import { PrismaService } from '.';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new Sale if it's not existed, otherwise do nothing
   *
   * @param data
   * @returns Sale
   */
  async create(data: SalesDto): Promise<Sales> {
    try {
      const sales = await this.prisma.sales.create({ data });
      return sales;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to create a new Sale', 500);
    }
  }

  /**
   * Update a Sale
   *
   * @param data
   * @returns Sale
   */
  async update(data: SalesDto): Promise<Sales | null> {
    try {
      const { id } = data;

      const response = await this.prisma.sales.update({
        where: {
          id,
        },
        data,
      });

      return response;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to update Sale data', 500);
    }
  }

  /**
   * Delete a Sale by id
   *
   * @param where
   * @returns Sale
   */
  async delete(where: Prisma.SalesWhereUniqueInput): Promise<Sales | null> {
    return this.prisma.sales.delete({
      where,
    });
  }

  /**
   * Find Sale by id
   *
   * @param where
   * @returns Sale
   */
  async findById(where: Prisma.SalesWhereUniqueInput): Promise<Sales | null> {
    return this.prisma.sales.findUnique({
      where,
    });
  }

  /**
   * Find all Sale
   *
   * @param where
   * @returns Sale Array
   */
  async findAll(where: Prisma.SalesWhereInput): Promise<any[]> {
    return this.prisma.sales.findMany({
      where,
      include: {
        Customers: {
          select: {
            name: true,
          },
        },
        Sellers: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async countSales(where: Prisma.SalesWhereInput): Promise<number> {
    const response = await this.prisma.sales.count();
    console.log('count', response);
    return response;
  }

  async sumRevenue(where: Prisma.SalesWhereInput): Promise<number> {
    const data = await this.prisma.sales.aggregate({
      _sum: {
        price: true,
      },
    });

    return data?._sum.price || 0;
  }
}
