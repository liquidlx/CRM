import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

export class CustomersAttributes {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  postalCode?: string | null;

  @IsString()
  @IsOptional()
  cpf?: string | null;
}

export class PostCustomersAttributes {
  data: CustomersAttributes;
}

export class FilterFields {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  postalCode?: string;
}

export class QueryCustomers {
  @ValidateNested()
  @Type(() => FilterFields)
  filter: FilterFields;
}
