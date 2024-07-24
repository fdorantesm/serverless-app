import type Datastore from "nedb-promises";

import { container } from "#/container";
import { Context, Event } from "#/lambda";
import { customersMock } from "#/customers/mocks/customers.mock";
import type { Customer } from "@/customers/domain/interfaces/customer.interface";
import { deleteCustomer } from "@/customers/infrastructure/http/handlers/delete-customer";

describe("deleteCustomerHandler", () => {
  const CustomerModel = container.get<Datastore<Customer>>("CustomerModel");

  beforeEach(async () => {
    await CustomerModel.remove({}, { multi: true });
  });

  it("should delete a customer", async () => {
    await CustomerModel.insert(customersMock[0].toPrimitives());

    Event.pathParameters = { id: "1" };

    const response = await deleteCustomer(Event, Context);
    const { statusCode } = response;

    expect(statusCode).toBe(204);
  });

  it("should return a 404 error deleting missing customer", async () => {
    Event.pathParameters = { id: "1" };

    const response = await deleteCustomer(Event, Context);
    const { statusCode } = response;

    expect(statusCode).toBe(404);
  });
});
