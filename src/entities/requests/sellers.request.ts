import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

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
