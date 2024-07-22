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
import type { DeleteCustomerUseCase } from "@/customers/application/use-cases/delete-customer.use-case";
import { CustomerNotFoundException } from "@/customers/domain/exceptions/customer-not-found.exception";

async function deleteCustomer(event: Event, context: Context & AppContext) {
  const id = event.pathParameters!.id!;
  const deleteCustomer = context.get<DeleteCustomerUseCase>(
    "DeleteCustomerUseCase"
  );

  try {
    await deleteCustomer.execute(id);
    return Response.noContent();
  } catch (error) {
    switch (error.name) {
      case CustomerNotFoundException.name: {
        return Response.error(404, error.message);
      }

      default: {
        return Response.error(500, error.message);
      }
    }
  }
}

export const handler = middy(deleteCustomer)
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
