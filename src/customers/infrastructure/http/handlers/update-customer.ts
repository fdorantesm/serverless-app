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
import type { UpdateCustomerUseCase } from "@/customers/application/use-cases/update-customer.use-case";
import type { UpdateCustomerDto } from "@/customers/infrastructure/http/dtos/update-customer.dto";
import { CustomerNotFoundException } from "@/customers/domain/exceptions/customer-not-found.exception";

export async function updateCustomer(
  event: Event,
  context: Context & AppContext
) {
  const id = event.pathParameters!.id!;
  const payload = event.body as unknown as UpdateCustomerDto;

  const updateCustomer = context.get<UpdateCustomerUseCase>(
    "UpdateCustomerUseCase"
  );

  try {
    const customer = await updateCustomer.execute(id, payload);
    return Response.success(200, customer.toPrimitives());
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

export const handler = middy(updateCustomer)
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
