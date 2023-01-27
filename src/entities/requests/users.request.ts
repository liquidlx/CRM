import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class UsersAttributes {
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  // CHANGE: This needs to be required. 
  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  stores: string[];
}

export class PostUsersRequest {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UsersAttributes)
  data: UsersAttributes;
}

export class PatchUsersRequest extends UsersAttributes {}
