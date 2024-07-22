import middy from "middy";
import {
  httpErrorHandler,
  httpHeaderNormalizer,
  jsonBodyParser,
  urlEncodeBodyParser,
} from "middy/middlewares";

import { Event, Context, type AppContext, injectorMiddleware } from "@/core";
import { container } from "@/customers";
import { databaseConnectorMiddleware } from "@/core/infrastructure/middlewares/database-connector.middleware";
import { Response } from "@/core/infrastructure/http/classes/response";
import type { ListCustomersUseCase } from "@/customers/application/use-cases/list-customers.use-case";

async function listCustomers(_event: Event, context: Context & AppContext) {
  const listCustomers = context.get<ListCustomersUseCase>(
    "ListCustomersUseCase"
  );

  try {
    const customers = await listCustomers.execute();
    const data = customers.map((customer) => customer.toPrimitives());
    return Response.success(200, data);
  } catch (error) {
    return Response.error(500, error.message);
  }
}

export const handler = middy(listCustomers)
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
