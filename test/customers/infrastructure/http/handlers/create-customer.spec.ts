import type Datastore from "nedb-promises";

import { container } from "#/container";
import { Context, Event } from "#/lambda";
import type { Customer } from "@/customers/domain/interfaces/customer.interface";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";
import { createCustomer } from "@/customers/infrastructure/http/handlers/create-customer";
import { customersMock } from "#/customers/mocks/customers.mock";
import middy from "middy";
import { validationMiddleware } from "@/core/infrastructure/middlewares/validator.middleware";
import { CreateCustomerDto } from "@/customers/infrastructure/http/dtos/create-customer.dto";
import { jsonBodyParser } from "middy/middlewares";

describe("CreateCustomerHandler", () => {
  const CustomerModel = container.get<Datastore<Customer>>("CustomerModel");

  beforeEach(async () => {
    await CustomerModel.remove({}, { multi: true });
  });

  it("should create a customer", async () => {
    const payload: CustomerPayload = {
      name: "John Doe",
      email: "john@example.com",
      phone: "5555555555",
    };

    Event.body = payload as any;

    const response = await createCustomer(Event, Context);
    const { statusCode } = response;
    const body = JSON.parse(response.body);
    const customer: Customer = body.data;

    expect(statusCode).toBe(201);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.email).toBe("john@example.com");
    expect(customer.phone).toBe("5555555555");
    expect(customer.createdAt).toBeDefined();
    expect(customer.updatedAt).toBeDefined();
  });

  it("should return a 409 error creating a user with existing email", async () => {
    await CustomerModel.insert(customersMock[0].toPrimitives());

    const payload: CustomerPayload = {
      name: "John Doe",
      email: "john@example.com",
      phone: "5555555555",
    };

    Event.body = payload as any;

    const response = await createCustomer(Event, Context);
    const { statusCode } = response;
    const body = JSON.parse(response.body);

    expect(statusCode).toBe(409);
    expect(body.message).toBe(
      `Customer with email ${payload.email} already exists`
    );
  });

  it("should return a 409 error sending missing email", async () => {
    const payload: any = {
      name: "John K. Doe",
      phone: "+525555555555",
    };

    Context.callbackWaitsForEmptyEventLoop = false;
    Event.body = JSON.stringify(payload);

    const middyHandler = middy(createCustomer).use(
      validationMiddleware(CreateCustomerDto)
    );

    try {
      await new Promise((resolve, reject) => {
        middyHandler(Event, Context, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        });
      });
    } catch (error) {
      const { statusCode } = error;
      const body = JSON.parse(error.body);

      expect(statusCode).toBe(400);
      expect(body.message).toBe("Validation error");
      expect(body.data[0]).toBe("email must be an email");
    }
  });

  it("should return a 409 error sending missing name", async () => {
    const payload: any = {
      email: "john@example.com",
      phone: "+525555555555",
    };

    Context.callbackWaitsForEmptyEventLoop = false;
    Event.body = JSON.stringify(payload);

    const middyHandler = middy(createCustomer)
      .use(validationMiddleware(CreateCustomerDto))
      .use(jsonBodyParser());

    try {
      await new Promise((resolve, reject) => {
        middyHandler(Event, Context, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        });
      });
    } catch (error) {
      const { statusCode } = error;
      const body = JSON.parse(error.body);

      expect(statusCode).toBe(400);
      expect(body.message).toBe("Validation error");
      expect(body.data[0]).toBe("name must be a string");
    }
  });

  it("should return a 409 error sending missing or invalid phone", async () => {
    const payload: any = {
      email: "john@example.com",
      name: "John Doe",
    };

    Context.callbackWaitsForEmptyEventLoop = false;
    Event.body = JSON.stringify(payload);

    const middyHandler = middy(createCustomer).use(
      validationMiddleware(CreateCustomerDto)
    );

    try {
      await new Promise((resolve, reject) => {
        middyHandler(Event, Context, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        });
      });
    } catch (error) {
      const { statusCode } = error;
      const body = JSON.parse(error.body);

      expect(statusCode).toBe(400);
      expect(body.message).toBe("Validation error");
      expect(body.data[0]).toBe("phone must be a valid phone number");
    }
  });

  it("should return a 409 error sending missing fields", async () => {
    Context.callbackWaitsForEmptyEventLoop = false;
    Event.body = JSON.stringify({});

    const middyHandler = middy(createCustomer).use(
      validationMiddleware(CreateCustomerDto)
    );

    try {
      await new Promise((resolve, reject) => {
        middyHandler(Event, Context, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        });
      });
    } catch (error) {
      const { statusCode } = error;
      const body = JSON.parse(error.body);

      expect(statusCode).toBe(400);
      expect(body.message).toBe("Validation error");
      expect(body.data[0]).toBe("name must be a string");
      expect(body.data[1]).toBe("email must be an email");
      expect(body.data[2]).toBe("phone must be a valid phone number");
    }
  });
});
