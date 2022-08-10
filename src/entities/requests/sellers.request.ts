export class SellersAttributes {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export class PostSellersRequest {
  data: SellersAttributes;
}
