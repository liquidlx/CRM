export class SalesAttributes {
  id?: string;
  createdAt?: Date;
  price: number;
  customersId: string;
  sellersId: string;
}

export class PostSalesRequest {
  data: SalesAttributes;
}
