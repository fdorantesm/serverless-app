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

async function listCustomers(event: Event, context: Context & AppContext) {
  const customerService = context.get<CustomersService>("CustomersService");
  const customers = await customerService.list();

  const data = customers.map((customer) => customer.toPrimitives());

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  };
}

export const handler = middy(listCustomers)
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
