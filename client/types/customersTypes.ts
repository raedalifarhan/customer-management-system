import { PagingParams } from "./PaginationType";

export class CustomerParams extends PagingParams {

  constructor(pageNumber: number = 1, pageSize: number = 10) {
    super(pageNumber, pageSize)
  }
}

export interface CustomerType {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}


export interface CustomerFormType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

