export class StoresAttributes {
  id: string;
  cnpj: string;
  name: string;
  companiesId: string;
}

export class PostStoresRequest {
  data: StoresAttributes;
}
