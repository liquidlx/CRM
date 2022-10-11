import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class SellersAttributes {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  cpf: string;
}

export class PostSellersRequest {
  @ValidateNested()
  @Type(() => SellersAttributes)
  data: SellersAttributes;
}

export class SellersQueryFilter {
  @IsString()
  storesId: string;
}

export class SellersQuery {
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested()
  @Type(() => SellersQueryFilter)
  filter?: SellersQueryFilter;
}
