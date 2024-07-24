import type Datastore from "nedb-promises";

import { Inject, Injectable } from "@/core/injection";
import type { CustomersRepository } from "@/customers/domain/contracts/customers.repository";
import { CustomerEntity } from "@/customers/domain/entities/customer.entity";
import type { Customer } from "@/customers/domain/interfaces/customer.interface";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";

@Injectable()
export class CustomersMemoryRepository implements CustomersRepository {
  constructor(
    @Inject("CustomerModel")
    private readonly model: Datastore<Customer>
  ) {}

  public async list(filter?: Partial<Customer>): Promise<CustomerEntity[]> {
    const customers = await this.model.find(filter ?? {}).exec();
    return customers.map((customer) =>
      CustomerEntity.createFromPrimitives(customer)
    );
  }

  public async get(id: string): Promise<CustomerEntity | undefined> {
    const customer = await this.model.findOne({ id });
    if (customer) {
      return CustomerEntity.createFromPrimitives(customer);
    }

    return undefined;
  }

  public async update(
    id: string,
    payload: CustomerPayload
  ): Promise<CustomerEntity | undefined> {
    const customer = await this.model.update(
      { id },
      {
        $set: payload,
      },
      {
        multi: false,
        returnUpdatedDocs: true,
      }
    );

    if (customer) {
      return CustomerEntity.createFromPrimitives(customer);
    }

    return undefined;
  }

  public async delete(id: string): Promise<boolean> {
    await this.model.deleteOne({ id }, { multi: false });
    return true;
  }

  public async exists(id: string): Promise<boolean> {
    const customer = await this.model.findOne({ id }, { id: 1 }).exec();
    return Boolean(customer);
  }

  public async create(payload: CustomerPayload): Promise<CustomerEntity> {
    const customer = await this.model.insert(payload);
    return CustomerEntity.createFromPrimitives(customer);
  }

  public async findOne(
    filter: Partial<Customer>
  ): Promise<CustomerEntity | undefined> {
    const customer = await this.model.findOne(filter).exec();
    if (customer) {
      return CustomerEntity.createFromPrimitives(customer);
    }

    return undefined;
  }

  public async clear(): Promise<void> {
    await this.model.remove({}, { multi: true });
  }
}
