import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { UserDto } from '../entities/dtos';
import { PrismaService } from '.';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new user if it's not existed, otherwise do nothing
   *
   * @param user
   * @returns User
   */
  async create(data): Promise<UserDto> {
    const { stores, ...userData } = data;
    const response = await this.prisma.users.create({
      data: {
        ...userData,
        stores: {
          connect: stores,
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        updatedAt: true,
        createdAt: true,
        stores: {
          select: {
            id: true,
          },
        },
      },
    });

    return response;
  }

  /**
   * Update a user
   *
   * @param data
   * @returns User
   */
  async update(data): Promise<UserDto | null> {
    const { id } = data;

    const response = await this.prisma.users.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    return response;
  }

  /**
   * Delete a user by id
   *
   * @param where
   * @returns User
   */
  async delete(where: Prisma.UsersWhereUniqueInput): Promise<Users | null> {
    return this.prisma.users.update({
      data: {
        deleted: true,
      },
      where,
    });
  }

  /**
   * Find user by id
   *
   * @param where
   * @returns User
   */
  async findOne(where: Prisma.UsersWhereInput): Promise<UserDto | null> {
    return this.prisma.users.findFirst({
      where,
    });
  }

  /**
   * Find all users
   *
   * @param where
   * @returns Users Array
   */
  async findAll(where: Prisma.UsersWhereInput): Promise<UserDto[]> {
    return this.prisma.users.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        updatedAt: true,
        createdAt: true,
      },
    });
  }
}
