import type Datastore from "nedb-promises";

import { container } from "#/container";
import { customersMock } from "#/customers/mocks/customers.mock";
import { Context, Event } from "#/lambda";
import type { Customer } from "@/customers/domain/interfaces/customer.interface";
import { updateCustomer } from "@/customers/infrastructure/http/handlers/update-customer";

describe("UpdateCustomerHandler", () => {
  const CustomerModel = container.get<Datastore<Customer>>("CustomerModel");

  beforeEach(async () => {
    await CustomerModel.remove({}, { multi: true });
  });

  it("should update a customer", async () => {
    await CustomerModel.insert(customersMock[0].toPrimitives());
    const payload: any = {
      name: "John K. Doe",
      email: "johnk@example.com",
      phone: "5555555555",
    };

    Event.body = payload;
    Event.pathParameters = { id: "1" };

    const response = await updateCustomer(Event, Context);
    const { statusCode } = response;
    const body = JSON.parse(response.body);
    const customer: Customer = body.data;

    expect(statusCode).toBe(200);
    expect(customer).toStrictEqual({
      ...customersMock[0].toPrimitives(),
      name: "John K. Doe",
      email: "johnk@example.com",
      phone: "5555555555",
      createdAt: customer.createdAt.toString(),
      updatedAt: customer.updatedAt.toString(),
    });
  });

  it("should return a 404 error updating missing customer", async () => {
    const payload: any = {
      name: "John K. Doe",
      email: "johnk@example.com",
      phone: "5555555555",
    };

    Event.body = payload;
    Event.pathParameters = { id: "1" };

    const response = await updateCustomer(Event, Context);
    const { statusCode } = response;

    expect(statusCode).toBe(404);
  });
});
