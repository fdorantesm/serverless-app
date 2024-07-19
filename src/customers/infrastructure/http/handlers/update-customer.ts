import middy from "middy";
import { httpErrorHandler, httpHeaderNormalizer } from "middy/middlewares";

import { Event, Context, type AppContext, injectorMiddleware } from "@/core";
import { CustomersService } from "@/customers/domain/contracts/customers.service";
import { container } from "@/customers";

async function updateCustomer(event: Event, context: Context & AppContext) {
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
}

export const handler = middy(updateCustomer)
  .use(injectorMiddleware(container))
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
