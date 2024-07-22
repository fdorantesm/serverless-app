import type { Executable } from "@/core/domain/interfaces/executable.interface";
import { Inject, Injectable } from "@/core/injection";
import type { CustomersService } from "@/customers/domain/contracts/customers.service";
import type { CustomerEntity } from "@/customers/domain/entities/customer.entity";

@Injectable()
export class ListCustomersUseCase implements Executable {
  constructor(
    @Inject("CustomersService")
    private readonly customersService: CustomersService
  ) {}

  public execute(): Promise<CustomerEntity[]> {
    return this.customersService.list();
  }
}
