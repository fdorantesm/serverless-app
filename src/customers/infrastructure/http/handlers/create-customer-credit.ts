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
import { CreateCustomerCreditDto } from "@/customers/infrastructure/http/dtos/create-customer-credit.dto";
import { validationMiddleware } from "@/core/infrastructure/middlewares/validator.middleware";
import type { CreateCreditUseCase } from "@/credits";
import { Response } from "@/core/infrastructure/http/classes/response";

async function createCustomerCredit(
  event: Event,
  context: Context & AppContext
) {
  const customerId = event.pathParameters!.customerId!;
  const customerService = context.get<CustomersService>("CustomersService");

  try {
    const customerExists = await customerService.exists(customerId);

    if (!customerExists) {
      return Response.error(404, "Customer not found");
    }

    const payload = event.body as unknown as CreateCustomerCreditDto;

    const createCredit = context.get<CreateCreditUseCase>(
      "CreateCreditUseCase"
    );

    const credit = await createCredit.execute({
      customerId,
      ...payload,
    });

    return Response.success(201, credit.toPrimitives());
  } catch (error: any) {
    switch (error.name) {
      case "CreditAlreadyExistsException": {
        return Response.error(409, error.message);
      }

      default: {
        return Response.error(500, error.message);
      }
    }
  }
}

export const handler = middy(createCustomerCredit)
  .use(validationMiddleware(CreateCustomerCreditDto))
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
