import { inject, injectable } from "inversify";

import type { CustomersRepository } from "@/customers/domain/contracts/customers.repository";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";

@injectable()
export class CustomersService {
  constructor(
    @inject("CustomersRepository")
    private readonly customersRepository: CustomersRepository
  ) {}

  public async list() {
    return this.customersRepository.list();
  }

  public async create(data: CustomerPayload) {
    return this.customersRepository.create(data);
  }
}
