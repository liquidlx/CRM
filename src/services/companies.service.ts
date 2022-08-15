import { HttpException, Injectable } from '@nestjs/common';
import { Companies, Prisma, Users } from '@prisma/client';
import { CompaniesDto } from '../entities/dtos';
import { PrismaService } from '.';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new company if it's not existed, otherwise do nothing
   *
   * @param data
   * @returns Companies
   */
  async create(data: CompaniesDto): Promise<Companies> {
    try {
      const company = await this.prisma.companies.create({ data });
      return company;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to create a new Company', 500);
    }
  }

  /**
   * Update a Company
   *
   * @param data
   * @returns Company
   */
  async update(data: CompaniesDto): Promise<Companies | null> {
    try {
      const { id } = data;

      const response = await this.prisma.companies.update({
        where: {
          id,
        },
        data,
      });

      return response;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to update Company data', 500);
    }
  }

  /**
   * Delete a company by id
   *
   * @param where
   * @returns Company
   */
  async delete(
    where: Prisma.CompaniesWhereUniqueInput,
  ): Promise<Companies | null> {
    return this.prisma.companies.delete({
      where,
    });
  }

  /**
   * Find Company by id
   *
   * @param where
   * @returns Company
   */
  async findOne(
    where: Prisma.CompaniesWhereUniqueInput,
  ): Promise<Companies | null> {
    return this.prisma.companies.findUnique({
      where,
      select: {
        id: true,
        cnpj: true,
        name: true,
        createdAt: true,
      },
    });
  }

  /**
   * Find all Companies
   *
   * @param where
   * @returns Companies Array
   */
  async findAll(where: Prisma.CompaniesWhereInput): Promise<Companies[]> {
    return this.prisma.companies.findMany({
      where,
      select: {
        id: true,
        cnpj: true,
        name: true,
        createdAt: true,
      },
    });
  }
}
