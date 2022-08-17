import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class SalesAttributes {
  @IsString()
  @IsOptional()
  id?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsNumber()
  price: number;

  @IsUUID()
  customersId: string;

  @IsUUID()
  sellersId: string;
}

export class GetSalesAttributes {
  id?: string;
  createdAt?: Date;
  price: number;
  customersId: string;
  sellersId: string;
  customersName: string;
  sellersName: string;
}

export class PostSalesRequest {
  @ValidateNested()
  @Type(() => SalesAttributes)
  data: SalesAttributes;
}
