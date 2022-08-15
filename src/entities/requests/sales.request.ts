export class SalesAttributes {
  id?: string;
  createdAt?: Date;
  price: number;
  customersId: string;
  sellersId: string;
}

export class GetSalesAttributes {
  id?: string;
  createdAt?: Date;
  price: number;
  customersId: string;
  sellersId: string;
  customersName: string;
  sellersName: string;
}

export class PostSalesRequest {
  data: SalesAttributes;
}
