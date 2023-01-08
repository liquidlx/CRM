import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class StoresAttributes {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  cnpj: string;

  @IsString()
  name: string;

  @IsString()
  companiesId: string;
}

export class PostStoresRequest {
  @ValidateNested()
  @Type(() => StoresAttributes)
  data: StoresAttributes;
}
