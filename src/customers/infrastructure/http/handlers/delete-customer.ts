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

async function deleteCustomer(event: Event, context: Context & AppContext) {
  const id = event.pathParameters!.id!;

  const customersService = context.get<CustomersService>("CustomersService");

  const exists = await customersService.exists(id);

  if (!exists) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Customer not found" }),
    };
  }

  await customersService.delete(id);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Customer deleted",
    }),
  };
}

export const handler = middy(deleteCustomer)
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
