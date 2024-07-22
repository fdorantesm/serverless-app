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
import { UpdateCustomerCreditDto } from "@/customers/infrastructure/http/dtos/update-customer-credit.dto";
import { databaseConnectorMiddleware } from "@/core/infrastructure/middlewares/database-connector.middleware";
import { validationMiddleware } from "@/core/infrastructure/middlewares/validator.middleware";
import type { UpdateCreditUseCase } from "@/credits/application/use-cases/update-credit.use-case";
import { Response } from "@/core/infrastructure/http/classes/response";

async function updateCustomerCredit(
  event: Event,
  context: Context & AppContext
) {
  const customerId = event.pathParameters!.customerId!;
  const creditId = event.pathParameters!.creditId!;
  const customerService = context.get<CustomersService>("CustomersService");

  try {
    const customerExists = await customerService.exists(customerId);

    if (!customerExists) {
      return Response.error(404, "Customer not found");
    }

    const payload = event.body as unknown as UpdateCustomerCreditDto;

    const updateCredit = context.get<UpdateCreditUseCase>(
      "UpdateCreditUseCase"
    );
    const credit = await updateCredit.execute(creditId, payload);

    return Response.success(200, credit.toPrimitives());
  } catch (error) {
    switch (error.name) {
      case "CreditNotFoundException": {
        return Response.error(404, error.message);
      }

      default: {
        return Response.error(500, error.message);
      }
    }
  }
}

export const handler = middy(updateCustomerCredit)
  .use(validationMiddleware(UpdateCustomerCreditDto))
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
