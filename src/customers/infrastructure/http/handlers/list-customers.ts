import middy from "middy";
import { httpErrorHandler, httpHeaderNormalizer } from "middy/middlewares";

import { Event, Context, type AppContext, injectorMiddleware } from "@/core";
import { CustomersService } from "@/customers/domain/contracts/customers.service";
import { container } from "@/customers";

async function listCustomers(event: Event, context: Context & AppContext) {
  const usersService = context.get<CustomersService>("UsersService");
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: await usersService.list(),
    }),
  };
}

export const handler = middy(listCustomers)
  .use(injectorMiddleware(container))
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
