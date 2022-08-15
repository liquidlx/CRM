import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, Sellers } from '@prisma/client';
import { SellersDto } from '../entities/dtos';
import { PrismaService } from '.';

@Injectable()
export class SellersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new Seller if it's not existed, otherwise do nothing
   *
   * @param data
   * @returns Seller
   */
  async create(data: SellersDto): Promise<Sellers> {
    try {
      const sellers = await this.prisma.sellers.create({ data });
      return sellers;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to create a new Seller', 500);
    }
  }

  /**
   * Update a Seller
   *
   * @param data
   * @returns Seller
   */
  async update(data: SellersDto): Promise<Sellers | null> {
    try {
      const { id } = data;

      const response = await this.prisma.sellers.update({
        where: {
          id,
        },
        data,
      });

      return response;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to update Seller data', 500);
    }
  }

  /**
   * Delete a Seller by id
   *
   * @param where
   * @returns Seller
   */
  async delete(where: Prisma.SellersWhereUniqueInput): Promise<Sellers | null> {
    return this.prisma.sellers.delete({
      where,
    });
  }

  /**
   * Find Seller by id
   *
   * @param where
   * @returns Seller
   */
  async findById(
    where: Prisma.SellersWhereUniqueInput,
  ): Promise<Sellers | null> {
    return this.prisma.sellers.findUnique({
      where,
    });
  }

  /**
   * Find all Seller
   *
   * @param where
   * @returns Sellers Array
   */
  async findAll(where: Prisma.SellersWhereInput): Promise<Sellers[]> {
    return this.prisma.sellers.findMany({
      where,
    });
  }
}
