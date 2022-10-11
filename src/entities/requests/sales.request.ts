import { Transform, Type } from 'class-transformer';
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

  @IsUUID()
  storesId: string;
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

export class SalesQueryFilter {
  @IsString()
  storesId: string;
}

export class SalesQuery {
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested()
  @Type(() => SalesQueryFilter)
  filter?: SalesQueryFilter;
}
