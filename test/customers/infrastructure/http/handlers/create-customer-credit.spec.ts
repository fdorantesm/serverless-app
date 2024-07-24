import type Datastore from "nedb-promises";
import middy from "middy";
import {
  httpErrorHandler,
  jsonBodyParser,
  urlEncodeBodyParser,
  httpHeaderNormalizer,
} from "middy/middlewares";

import { container } from "#/container";
import { customersMock } from "#/customers/mocks/customers.mock";
import { Context, Event } from "#/lambda";
import { validationMiddleware } from "@/core/infrastructure/middlewares/validator.middleware";
import type { Customer } from "@/customers/domain/interfaces/customer.interface";
import { CreateCustomerCreditDto } from "@/customers/infrastructure/http/dtos/create-customer-credit.dto";
import { createCustomerCredit } from "@/customers/infrastructure/http/handlers/create-customer-credit";

describe("createCustomerCreditHandler", () => {
  const CustomerModel = container.get<Datastore<Customer>>("CustomerModel");

  beforeEach(async () => {
    await CustomerModel.remove({}, { multi: true });
  });

  it("should create a new credit for a customer", async () => {
    const payload = customersMock[0].toPrimitives();
    const customer = await CustomerModel.insert(payload);

    Event.pathParameters = { customerId: customer.id };

    const creditPayload = {
      limit: 1000,
      cutOffDay: 1,
      currency: "USD",
    };

    Event.body = creditPayload as any;

    const response = await createCustomerCredit(Event, Context);

    const { statusCode } = response;
    const body = JSON.parse(response.body);
    expect(statusCode).toBe(201);
    expect(body.data.customerId).toBe(customer.id);
    expect(body.data.limit).toBe(1000);
    expect(body.data.cutOffDay).toBe(1);
    expect(body.data.currency).toBe("USD");
    expect(body.data.balance).toBe(0);
  });

  it("should return a 404 error when the customer does not exist", async () => {
    Event.pathParameters = { customerId: "1" };
    const creditPayload = {
      limit: 1000,
      cutOffDay: 1,
      currency: "USD",
    };

    Event.body = creditPayload as any;

    const response = await createCustomerCredit(Event, Context);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  it("should return a 409 error when the customer already has a credit", async () => {
    const payload = customersMock[0].toPrimitives();
    const customer = await CustomerModel.insert(payload);

    Event.pathParameters = { customerId: customer.id };

    const creditPayload = {
      limit: 1000,
      cutOffDay: 1,
      currency: "USD",
    };

    Event.body = creditPayload as any;

    await createCustomerCredit(Event, Context);

    const response = await createCustomerCredit(Event, Context);

    const { statusCode } = response;
    expect(statusCode).toBe(409);
  });

  it("should return a 400 error when the currency is missing", async () => {
    const payload = customersMock[0].toPrimitives();
    const customer = await CustomerModel.insert(payload);

    Event.pathParameters = { customerId: customer.id };

    const creditPayload = {
      limit: 1000,
      cutOffDay: 1,
    };

    Event.body = JSON.stringify(creditPayload);

    const middyHandler = middy(createCustomerCredit)
      .use(validationMiddleware(CreateCustomerCreditDto))
      .use(jsonBodyParser())
      .use(urlEncodeBodyParser())
      .use(httpHeaderNormalizer())
      .use(httpErrorHandler());

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
      expect(body.data[0]).toBe(
        "currency must be a valid ISO4217 currency code"
      );
    }
  });

  it("should return a 400 error when the limit is missing", async () => {
    const payload = customersMock[0].toPrimitives();
    const customer = await CustomerModel.insert(payload);

    Event.pathParameters = { customerId: customer.id };

    const creditPayload = {
      currency: "MXN",
      cutOffDay: 1,
    };

    Event.body = JSON.stringify(creditPayload);

    const middyHandler = middy(createCustomerCredit)
      .use(validationMiddleware(CreateCustomerCreditDto))
      .use(jsonBodyParser())
      .use(urlEncodeBodyParser())
      .use(httpHeaderNormalizer())
      .use(httpErrorHandler());

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
      expect(body.data[0]).toBe("limit must be a positive number");
    }
  });

  it("should return a 400 error when the limit is not a positive number", async () => {
    const payload = customersMock[0].toPrimitives();
    const customer = await CustomerModel.insert(payload);

    Event.pathParameters = { customerId: customer.id };

    const creditPayload = {
      currency: "MXN",
      cutOffDay: 1,
      limit: 0,
    };

    Event.body = JSON.stringify(creditPayload);

    const middyHandler = middy(createCustomerCredit)
      .use(validationMiddleware(CreateCustomerCreditDto))
      .use(jsonBodyParser())
      .use(urlEncodeBodyParser())
      .use(httpHeaderNormalizer())
      .use(httpErrorHandler());

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
      expect(body.data[0]).toBe("limit must be a positive number");
    }
  });

  it("should return a 400 error when the cutOffDay is missing", async () => {
    const payload = customersMock[0].toPrimitives();
    const customer = await CustomerModel.insert(payload);

    Event.pathParameters = { customerId: customer.id };

    const creditPayload = {
      currency: "MXN",
      limit: 1000,
    };

    Event.body = JSON.stringify(creditPayload);

    const middyHandler = middy(createCustomerCredit)
      .use(validationMiddleware(CreateCustomerCreditDto))
      .use(jsonBodyParser())
      .use(urlEncodeBodyParser())
      .use(httpHeaderNormalizer())
      .use(httpErrorHandler());

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
      expect(body.data[0]).toBe("cutOffDay must not be greater than 31");
    }
  });

  it("should return a 400 error when the cutOffDay is lower than 0", async () => {
    const payload = customersMock[0].toPrimitives();
    const customer = await CustomerModel.insert(payload);

    Event.pathParameters = { customerId: customer.id };

    const creditPayload = {
      currency: "MXN",
      limit: 1000,
      cutOffDay: -1,
    };

    Event.body = JSON.stringify(creditPayload);

    const middyHandler = middy(createCustomerCredit)
      .use(validationMiddleware(CreateCustomerCreditDto))
      .use(jsonBodyParser())
      .use(urlEncodeBodyParser())
      .use(httpHeaderNormalizer())
      .use(httpErrorHandler());

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
      expect(body.data[0]).toBe("cutOffDay must not be less than 1");
    }
  });

  it("should return a 400 error when the body is missing", async () => {
    const payload = customersMock[0].toPrimitives();
    const customer = await CustomerModel.insert(payload);

    Event.pathParameters = { customerId: customer.id };

    Event.body = JSON.stringify({});

    const middyHandler = middy(createCustomerCredit)
      .use(validationMiddleware(CreateCustomerCreditDto))
      .use(jsonBodyParser())
      .use(urlEncodeBodyParser())
      .use(httpHeaderNormalizer())
      .use(httpErrorHandler());

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
      expect(body.data[0]).toBe("limit must be a positive number");
      expect(body.data[1]).toBe("cutOffDay must not be greater than 31");
      expect(body.data[2]).toBe("cutOffDay must not be less than 1");
      expect(body.data[3]).toBe("cutOffDay must be a positive number");
      expect(body.data[4]).toBe(
        "currency must be a valid ISO4217 currency code"
      );
    }
  });
});
