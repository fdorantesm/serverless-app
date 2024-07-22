import { Inject, Injectable } from "@/core/injection";
import type { CustomersRepository } from "@/customers/domain/contracts/customers.repository";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";

@Injectable()
export class CustomersService {
  constructor(
    @Inject("CustomersRepository")
    private readonly customersRepository: CustomersRepository
  ) {}

  public list() {
    return this.customersRepository.list();
  }

  public create(data: CustomerPayload) {
    return this.customersRepository.create(data);
  }

  public get(id: string) {
    return this.customersRepository.get(id);
  }

  public update(id: string, data: CustomerPayload) {
    return this.customersRepository.update(id, data);
  }

  public delete(id: string) {
    return this.customersRepository.delete(id);
  }

  public exists(id: string) {
    return this.customersRepository.exists(id);
  }

  public findOne(filter: Partial<CustomerPayload>) {
    return this.customersRepository.findOne(filter);
  }
}
