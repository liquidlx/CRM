import { HttpException, Injectable } from '@nestjs/common';
import { Customers, Prisma } from '@prisma/client';
import { CustomersDto } from '../entities/dtos';
import { PrismaService } from '.';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new Customer if it's not existed, otherwise do nothing
   *
   * @param data
   * @returns Customer
   */
  async create(data: CustomersDto): Promise<Customers> {
    try {
      const customer = await this.prisma.customers.create({ data });
      return customer;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to create a new Customer', 500);
    }
  }

  /**
   * Update a Customer
   *
   * @param data
   * @returns Customer
   */
  async update(data: CustomersDto): Promise<Customers | null> {
    try {
      const { id } = data;

      const response = await this.prisma.customers.update({
        where: {
          id,
        },
        data,
      });

      return response;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to update Customer data', 500);
    }
  }

  /**
   * Set Customer deleted column to true
   *
   * @param where
   * @returns Customer
   */
  async delete(
    where: Prisma.CustomersWhereUniqueInput,
  ): Promise<Customers | null> {
    return this.prisma.customers.update({
      data: {
        deleted: true,
      },
      where,
    });
  }

  /**
   * Find Customer by id
   *
   * @param where
   * @returns Customer
   */
  async findOne(
    where: Prisma.CustomersWhereUniqueInput,
  ): Promise<Customers | null> {
    return this.prisma.customers.findUnique({
      where,
    });
  }

  /**
   * Find all Customers
   *
   * @param where
   * @returns Customers Array
   */
  async findAll(where: Prisma.CustomersWhereInput): Promise<Customers[]> {
    return await this.prisma.customers.findMany({
      where,
    });
  }

  async countCustomers(): Promise<number> {
    const data = await this.prisma.customers.count();
    console.log('customers count', data);
    return data;
  }
}
