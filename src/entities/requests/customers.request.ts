import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class CustomersAttributes {
  id?: string;
  name: string;
  email: string;
  phone: string;
  postalCode?: string | null;
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
