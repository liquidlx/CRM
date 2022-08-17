import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class CompaniesAttributes {
  @IsString()
  name: string;

  @IsString()
  cnpj: string;
}

export class PostCompanyRequest {
  @ValidateNested()
  @Type(() => CompaniesAttributes)
  data: CompaniesAttributes;
}
