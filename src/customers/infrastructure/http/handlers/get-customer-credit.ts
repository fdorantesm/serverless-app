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
import type { GetCreditUseCase } from "@/credits";
import { Response } from "@/core/infrastructure/http/classes/response";

async function getCustomerCredit(event: Event, context: Context & AppContext) {
  const customerId = event.pathParameters!.customerId!;
  const creditId = event.pathParameters!.creditId!;
  const customerService = context.get<CustomersService>("CustomersService");

  try {
    const customerExists = await customerService.exists(customerId);

    if (!customerExists) {
      return Response.error(404, "Customer not found");
    }

    const getCredit = context.get<GetCreditUseCase>("GetCreditUseCase");
    const credit = await getCredit.execute(creditId);

    return Response.success(200, credit.toPrimitives());
  } catch (error) {
    return Response.error(500, error.message);
  }
}

export const handler = middy(getCustomerCredit)
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
