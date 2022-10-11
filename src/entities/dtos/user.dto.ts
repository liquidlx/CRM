import { Role, Users } from '@prisma/client';

export class UserDto {
  id?: string;
  name: string;
  email: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  password?: string;
}
