import { Inject, Injectable } from "@/core/injection";
import type { CustomersRepository } from "@/customers/domain/contracts/customers.repository";
import { CustomerEntity } from "@/customers/domain/entities/customer.entity";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";
import { CustomerModel } from "@/customers/infrastructure/database/models/customer.model";

@Injectable()
export class CustomersDatabaseRepository implements CustomersRepository {
  constructor(
    @Inject("CustomerModel") private readonly model: typeof CustomerModel
  ) {}

  public async create(data: CustomerPayload): Promise<CustomerEntity> {
    const customer = await this.model.create(data);
    return CustomerEntity.createFromPrimitives(customer.toJSON());
  }

  public async list(): Promise<CustomerEntity[]> {
    const customers = await this.model.find().exec();
    return customers.map((customer) =>
      CustomerEntity.createFromPrimitives(customer.toJSON())
    );
  }

  public async get(id: string): Promise<CustomerEntity | undefined> {
    const customer = await this.model.findOne({ id }).exec();

    if (customer) {
      return CustomerEntity.createFromPrimitives(customer.toJSON());
    }

    return undefined;
  }

  public async update(
    id: string,
    data: Partial<CustomerPayload>
  ): Promise<CustomerEntity | undefined> {
    const customer = await this.model.updateOne({ id }, data).exec();

    if (customer.matchedCount) {
      return this.get(id);
    }

    return undefined;
  }

  public async delete(id: string): Promise<boolean> {
    const customer = await this.model.deleteOne({ id }).exec();
    return Boolean(customer);
  }

  public async exists(id: string): Promise<boolean> {
    const customer = await this.model.findOne({ id }, { select: "id" }).exec();

    return Boolean(customer);
  }

  public async findOne(
    filter: Partial<CustomerPayload>
  ): Promise<CustomerEntity | undefined> {
    const customer = await this.model.findOne(filter).exec();

    if (customer) {
      return CustomerEntity.createFromPrimitives(customer.toJSON());
    }

    return undefined;
  }
}
