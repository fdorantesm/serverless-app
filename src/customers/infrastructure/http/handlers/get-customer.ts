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
import { Response } from "@/core/infrastructure/http/classes/response";
import type { GetCustomerUseCase } from "@/customers/application/use-cases/get-customer.use-case";

async function getCustomer(event: Event, context: Context & AppContext) {
  const getCustomer = context.get<GetCustomerUseCase>("GetCustomerUseCase");
  const id = event.pathParameters!.id!;
  try {
    const customer = await getCustomer.execute(id);
    return Response.success(200, customer.toPrimitives());
  } catch (error: any) {
    switch (error.name) {
      case "CustomerNotFoundError":
        return Response.error(404, error.message);
      default:
        return Response.error(500, error.message);
    }
  }
}

export const handler = middy(getCustomer)
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
