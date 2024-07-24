import type Datastore from "nedb-promises";

import { container } from "#/container";
import { customersMock } from "#/customers/mocks/customers.mock";
import type { Customer } from "@/customers/domain/interfaces/customer.interface";
import { listCustomers } from "@/customers/infrastructure/http/handlers/list-customers";
import { Context, Event } from "#/lambda";

describe("ListCustomersHandler", () => {
  const CustomerModel = container.get<Datastore<Customer>>("CustomerModel");

  beforeEach(async () => {
    await CustomerModel.remove({}, { multi: true });
  });

  it("should return a list of customers", async () => {
    await CustomerModel.insert(customersMock[0].toPrimitives());
    await CustomerModel.insert(customersMock[1].toPrimitives());

    const response = await listCustomers(Event, Context);
    const { statusCode } = response;
    const body = JSON.parse(response.body);
    const customers: Customer[] = body.data;

    expect(statusCode).toBe(200);
    expect(customers).toHaveLength(2);

    const john = customers.find((customer) => customer.name === "John Doe");
    const jane = customers.find((customer) => customer.name === "Jane Doe");

    expect(john).toStrictEqual({
      ...customersMock[0].toPrimitives(),
      createdAt: john!.createdAt.toString(),
      updatedAt: john!.updatedAt.toString(),
    });

    expect(jane).toStrictEqual({
      ...customersMock[1].toPrimitives(),
      createdAt: jane!.createdAt.toString(),
      updatedAt: jane!.updatedAt.toString(),
    });

    customers.map((customer: Customer) => {
      expect(customer.id).toBeDefined();
      expect(customer.name).toBeDefined();
      expect(customer.email).toBeDefined();
      expect(customer.phone).toBeDefined();
      expect(customer.updatedAt).toBeDefined();
    });
  });

  it("should return an empty list of customers", async () => {
    const response = await listCustomers(Event, Context);
    const { statusCode } = response;
    const body = JSON.parse(response.body);
    const customers: Customer[] = body.data;

    expect(statusCode).toBe(200);
    expect(customers).toHaveLength(0);
  });
});
