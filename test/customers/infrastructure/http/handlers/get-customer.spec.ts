import type Datastore from "nedb-promises";

import { container } from "#/container";
import { customersMock } from "#/customers/mocks/customers.mock";
import type { Customer } from "@/customers/domain/interfaces/customer.interface";
import { Context, Event } from "#/lambda";
import { getCustomer } from "@/customers/infrastructure/http/handlers/get-customer";

describe("GetCustomersHandler", () => {
  const CustomerModel = container.get<Datastore<Customer>>("CustomerModel");

  beforeEach(async () => {
    await CustomerModel.remove({}, { multi: true });
  });

  it("should return a customer", async () => {
    await CustomerModel.insert(customersMock[0].toPrimitives());

    const response = await getCustomer(
      { ...Event, pathParameters: { id: "1" } },
      Context
    );
    const { statusCode } = response;
    const body = JSON.parse(response.body);
    const customer: Customer = body.data;

    expect(statusCode).toBe(200);

    expect(body.data).toStrictEqual({
      ...customersMock[0].toPrimitives(),
      createdAt: customer!.createdAt.toString(),
      updatedAt: customer!.updatedAt.toString(),
    });

    expect(customer.id).toBeDefined();
    expect(customer.name).toBeDefined();
    expect(customer.email).toBeDefined();
    expect(customer.phone).toBeDefined();
    expect(customer.updatedAt).toBeDefined();
  });

  it("should return a 404 error", async () => {
    const response = await getCustomer(
      { ...Event, pathParameters: { id: "1" } },
      Context
    );
    const { statusCode } = response;

    expect(statusCode).toBe(404);
  });
});
