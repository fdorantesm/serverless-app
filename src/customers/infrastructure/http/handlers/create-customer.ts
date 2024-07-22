import middy from "middy";
import {
  httpErrorHandler,
  httpHeaderNormalizer,
  jsonBodyParser,
  urlEncodeBodyParser,
} from "middy/middlewares";

import { Event, Context, type AppContext, injectorMiddleware } from "@/core";
import { container } from "@/customers";
import { CreateCustomerDto } from "@/customers/infrastructure/http/dtos/create-customer.dto";
import { validationMiddleware } from "@/core/infrastructure/middlewares/validator.middleware";
import { databaseConnectorMiddleware } from "@/core/infrastructure/middlewares/database-connector.middleware";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";
import { Response } from "@/core/infrastructure/http/classes/response";
import type { CreateCustomerUseCase } from "@/customers/application/use-cases/create-customer.use-case";

async function createCustomer(event: Event, context: Context & AppContext) {
  try {
    const createCustomer = context.get<CreateCustomerUseCase>(
      "CreateCustomerUseCase"
    );
    const payload = event.body as unknown as CustomerPayload;
    const customer = await createCustomer.execute(payload);

    return Response.success(201, customer.toPrimitives());
  } catch (error) {
    switch (error.name) {
      case "CustomerAlreadyExistsException": {
        return Response.error(409, error.message);
      }

      default: {
        return Response.error(500, error.message);
      }
    }
  }
}

export const handler = middy(createCustomer)
  .use(validationMiddleware(CreateCustomerDto))
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
