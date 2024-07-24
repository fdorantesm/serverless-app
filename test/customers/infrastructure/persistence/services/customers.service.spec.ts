import Datastore from "nedb-promises";

import { container } from "#/container";
import { customersMock } from "#/customers/mocks/customers.mock";
import { CustomerEntity } from "@/customers/domain/entities/customer.entity";
import type { Customer } from "@/customers/domain/interfaces/customer.interface";
import type { CustomersService } from "@/customers/infrastructure/database/services/customers.service";

describe("CustomersService", () => {
  const customersService = container.get<CustomersService>("CustomersService");
  const customerModel = container.get<Datastore<Customer>>("CustomerModel");

  beforeEach(async () => {
    await customersService.clear();
  });

  it("should create a new customer", async () => {
    const customer = await customersService.create({
      name: customersMock[0].getName(),
      email: customersMock[0].getEmail(),
      phone: customersMock[0].getPhone(),
    });

    expect(customer instanceof CustomerEntity).toBe(true);
    expect(customer.getId()).toBeDefined();
    expect(customer.getName()).toBe(customersMock[0].getName());
    expect(customer.getEmail()).toBe(customersMock[0].getEmail());
    expect(customer.getPhone()).toBe(customersMock[0].getPhone());
    expect(customer.getCreatedAt()).toBeDefined();
  });

  it("should return a list of customers", async () => {
    await customerModel.insert(customersMock[0].toPrimitives());
    await customerModel.insert(customersMock[1].toPrimitives());

    const customers = await customersService.list();

    expect(customers).toHaveLength(2);

    customers.map((customer) => {
      expect(customer instanceof CustomerEntity).toBe(true);
      expect(customer.getId()).toBeDefined();
      expect(customer.getName()).toBeDefined();
      expect(customer.getEmail()).toBeDefined();
      expect(customer.getPhone()).toBeDefined();
      expect(customer.getCreatedAt()).toBeDefined();
    });

    const john = customers.find(
      (customer) => customer.getName() === "John Doe"
    );
    const jane = customers.find(
      (customer) => customer.getName() === "Jane Doe"
    );

    expect(john).toStrictEqual(customersMock[0]);
    expect(jane).toStrictEqual(customersMock[1]);
  });

  it("should find a customer by id", async () => {
    const createdCustomer = await customerModel.insert(
      customersMock[0].toPrimitives()
    );

    const customer = await customersService.get(createdCustomer.id);

    expect(customer).toBeDefined();
    expect(customer instanceof CustomerEntity).toBe(true);
  });

  it("should update a customer", async () => {
    const createdCustomer = await customerModel.insert(
      customersMock[0].toPrimitives()
    );

    const updatedCustomer = await customersService.update(createdCustomer.id, {
      name: "Updated Name",
      email: "updated@example.com",
      phone: "999999999",
    });

    expect(updatedCustomer!.getId()).toBeDefined();
    expect(updatedCustomer!.getName()).toBe("Updated Name");
    expect(updatedCustomer!.getEmail()).toBe("updated@example.com");
    expect(updatedCustomer!.getPhone()).toBe("999999999");
  });

  it("should delete a customer", async () => {
    const createdCustomer = await customerModel.insert(
      customersMock[0].toPrimitives()
    );

    await customersService.delete(createdCustomer.id);

    const customer = await customersService.get(createdCustomer.id);

    expect(customer).toBeUndefined();
  });
});
