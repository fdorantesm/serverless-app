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
import { databaseConnectorMiddleware } from "@/core/infrastructure/middlewares/database-connector.middleware";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";

async function updateCustomer(event: Event, context: Context & AppContext) {
  const id = event.pathParameters!.id!;
  const payload = event.body as Partial<CustomerPayload>;

  const customerService = context.get<CustomersService>("CustomersService");

  const customerExists = await customerService.exists(id);

  if (!customerExists) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Customer not found" }),
    };
  }

  const customer = await customerService.update(id, payload);

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: customer.toPrimitives(),
    }),
  };
}

export const handler = middy(updateCustomer)
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
