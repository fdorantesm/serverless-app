import middy from "middy";
import {
  httpErrorHandler,
  httpHeaderNormalizer,
  jsonBodyParser,
  urlEncodeBodyParser,
} from "middy/middlewares";

import { Event, Context, type AppContext, injectorMiddleware } from "@/core";
import { CustomersService } from "@/customers/domain/contracts/customers.service";
import { container } from "@/customers";
import { CreateCustomerDto } from "@/customers/infrastructure/http/dtos/create-customer.dto";
import { validationMiddleware } from "@/core/infrastructure/middlewares/validator.middleware";
import { CustomerEntity } from "@/customers/domain/entities/customer.entity";
import { databaseConnectorMiddleware } from "@/core/infrastructure/middlewares/database-connector.middleware";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";

async function createCustomer(event: Event, context: Context & AppContext) {
  try {
    const customerService = context.get<CustomersService>("CustomersService");
    const payload = event.body as unknown as CustomerPayload;

    const customer = await customerService.create(
      CustomerEntity.createToPrimitives(payload)
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ data: customer.toPrimitives() }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}

export const handler = middy(createCustomer)
  .use(validationMiddleware(CreateCustomerDto))
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
