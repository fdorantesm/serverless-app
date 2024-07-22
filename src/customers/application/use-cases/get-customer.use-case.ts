import type { Executable } from "@/core/domain/interfaces/executable.interface";
import { Inject, Injectable } from "@/core/injection";
import type { CustomersService } from "@/customers/domain/contracts/customers.service";
import type { CustomerEntity } from "@/customers/domain/entities/customer.entity";
import { CustomerNotFoundException } from "@/customers/domain/exceptions/customer-not-found.exception";

@Injectable()
export class GetCustomerUseCase implements Executable {
  constructor(
    @Inject("CustomersService")
    private readonly customersService: CustomersService
  ) {}

  public async execute(customerId: string): Promise<CustomerEntity> {
    const customer = await this.customersService.get(customerId);

    if (!customer) {
      throw new CustomerNotFoundException(
        `Customer with id ${customerId} not found`
      );
    }

    return customer;
  }
}
