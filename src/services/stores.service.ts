import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, Stores } from '@prisma/client';
import { StoresDto } from '../entities/dtos';
import { PrismaService } from '.';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new store if it's not existed, otherwise do nothing
   *
   * @param data
   * @returns Stores
   */
  async create(data: StoresDto): Promise<Stores> {
    try {
      const store = await this.prisma.stores.create({ data });
      return store;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to create a new Store', 500);
    }
  }

  /**
   * Update a store
   *
   * @param data
   * @returns Store
   */
  async update(data: StoresDto): Promise<Stores | null> {
    try {
      const { id } = data;

      const response = await this.prisma.stores.update({
        where: {
          id,
        },
        data,
      });

      return response;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to update Store data', 500);
    }
  }

  /**
   * Delete a Store by id
   *
   * @param where
   * @returns Store
   */
  async delete(where: Prisma.StoresWhereUniqueInput): Promise<Stores | null> {
    return this.prisma.stores.delete({
      where,
    });
  }

  /**
   * Find Store by id
   *
   * @param where
   * @returns Store
   */
  async findOne(where: Prisma.StoresWhereUniqueInput): Promise<Stores | null> {
    return this.prisma.stores.findUnique({
      where,
    });
  }

  /**
   * Find all Stores
   *
   * @param where
   * @returns Stores Array
   */
  async findAll(where: Prisma.StoresWhereUniqueInput): Promise<Stores[]> {
    return this.prisma.stores.findMany({
      where,
    });
  }
}
