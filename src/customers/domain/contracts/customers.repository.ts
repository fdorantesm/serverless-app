import type { CustomerEntity } from "@/customers/domain/entities/customer.entity";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";

export interface CustomersRepository {
  create(data: CustomerPayload): Promise<CustomerEntity>;
  list(): Promise<CustomerEntity[]>;
  get(id: string): Promise<CustomerEntity | undefined>;
  update(
    id: string,
    data: Partial<CustomerPayload>
  ): Promise<CustomerEntity | undefined>;
  delete(id: string): Promise<boolean>;
  exists(id: string): Promise<boolean>;
  findOne(
    filter: Partial<CustomerPayload>
  ): Promise<CustomerEntity | undefined>;
  clear(): Promise<void>;
}
