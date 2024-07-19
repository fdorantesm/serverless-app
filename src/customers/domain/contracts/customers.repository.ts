import type { CustomerEntity } from "@/customers/domain/entities/customer.entity";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";

export interface CustomersRepository {
  create(data: CustomerPayload): Promise<CustomerEntity>;
  list(): Promise<CustomerEntity[]>;
}
