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
import type { GetCreditsUseCase } from "@/credits/application/use-cases/get-credits.use-case";

async function getCustomerCredits(event: Event, context: Context & AppContext) {
  const customerId = event.pathParameters!.customerId!;
  const customerService = context.get<CustomersService>("CustomersService");

  try {
    const customerExists = await customerService.exists(customerId);

    if (!customerExists) {
      return Response.error(404, "Customer not found");
    }

    const getCredits = context.get<GetCreditsUseCase>("GetCreditsUseCase");
    const credits = await getCredits.execute(customerId);
    const creditsPrimitives = credits.map((credit) => credit.toPrimitives());

    return Response.success(200, creditsPrimitives);
  } catch (error) {
    return Response.error(500, error.message);
  }
}

export const handler = middy(getCustomerCredits)
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
