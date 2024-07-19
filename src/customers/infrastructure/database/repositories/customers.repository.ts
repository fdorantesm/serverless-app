import type { CustomerEntity } from "@/customers/domain/entities/customer.entity";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";
import { injectable } from "inversify";

@injectable()
export class CustomersRepository {
  constructor() {}

  public async create(data: CustomerPayload): Promise<CustomerEntity> {
    return data as unknown as CustomerEntity;
  }

  public async list(): Promise<CustomerEntity[]> {
    return [];
  }
}
