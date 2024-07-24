import type { Executable } from "@/core/domain/interfaces/executable.interface";
import { Inject, Injectable } from "@/core/injection";
import type { CustomersService } from "@/customers/domain/contracts/customers.service";
import { CustomerEntity } from "@/customers/domain/entities/customer.entity";
import { CustomerAlreadyExistsException } from "@/customers/domain/exceptions/customer-already-exists.exception";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";

@Injectable()
export class CreateCustomerUseCase implements Executable {
  constructor(
    @Inject("CustomersService")
    private readonly customersService: CustomersService
  ) {}

  public async execute(payload: CustomerPayload): Promise<CustomerEntity> {
    const existingCustomer = await this.customersService.findOne({
      email: payload.email,
    });

    if (existingCustomer) {
      throw new CustomerAlreadyExistsException(
        `Customer with email ${payload.email} already exists`
      );
    }

    const customer = await this.customersService.create(
      CustomerEntity.createToPrimitives(payload)
    );

    return customer;
  }
}
