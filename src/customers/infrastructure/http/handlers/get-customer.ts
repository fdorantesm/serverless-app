import middy from "middy";
import { httpErrorHandler, httpHeaderNormalizer } from "middy/middlewares";

import { Event, Context, type AppContext, injectorMiddleware } from "@/core";
import { CustomersService } from "@/customers/domain/contracts/customers.service";
import { container } from "@/customers";

async function getCustomer(event: Event, context: Context & AppContext) {
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
}

export const handler = middy(getCustomer)
  .use(injectorMiddleware(container))
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
