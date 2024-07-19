import middy from "middy";
import { httpErrorHandler, httpHeaderNormalizer } from "middy/middlewares";

import { Event, Context, type AppContext, injectorMiddleware } from "@/core";
import { CustomersService } from "@/customers/domain/contracts/customers.service";
import { container } from "@/customers";
import { CreateCustomerDto } from "@/customers/infrastructure/http/dtos/create-customer.dto";
import { validationMiddleware } from "@/core/infrastructure/middlewares/validator.middleware";

async function createCustomer(event: Event, context: Context & AppContext) {
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
}

export const handler = middy(createCustomer)
  .use(validationMiddleware(CreateCustomerDto))
  .use(injectorMiddleware(container))
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
