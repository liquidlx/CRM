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