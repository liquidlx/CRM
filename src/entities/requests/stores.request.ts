import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class StoresAttributes {
  @IsString()
  id: string;

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
