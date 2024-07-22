import type { Executable } from "@/core/domain/interfaces/executable.interface";
import { Inject, Injectable } from "@/core/injection";
import type { CustomersService } from "@/customers/domain/contracts/customers.service";
import type { CustomerEntity } from "@/customers/domain/entities/customer.entity";
import { CustomerNotFoundException } from "@/customers/domain/exceptions/customer-not-found.exception";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";

@Injectable()
export class UpdateCustomerUseCase implements Executable {
  constructor(
    @Inject("CustomersService")
    private readonly customersService: CustomersService
  ) {}

  public async execute(
    customerId: string,
    payload: Partial<CustomerPayload>
  ): Promise<CustomerEntity> {
    const customer = await this.customersService.get(customerId);

    if (!customer) {
      throw new CustomerNotFoundException(
        `Customer with id ${customerId} not found`
      );
    }

    const updatedCustomer = await this.customersService.update(
      customerId,
      payload
    );

    return updatedCustomer;
  }
}
