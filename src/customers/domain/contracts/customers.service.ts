import type { CustomerEntity } from "@/customers/domain/entities/customer.entity";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";

export interface CustomersService {
  list(): Promise<CustomerEntity[]>;
  create(data: CustomerPayload): Promise<CustomerEntity>;
  update(id: string, data: Partial<CustomerPayload>): Promise<CustomerEntity>;
  get(id: string): Promise<CustomerEntity>;
  delete(id: string): Promise<boolean>;
  exists(id: string): Promise<boolean>;
}
