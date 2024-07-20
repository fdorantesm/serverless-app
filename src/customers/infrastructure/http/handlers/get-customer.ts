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

async function getCustomer(event: Event, context: Context & AppContext) {
  const customersService = context.get<CustomersService>("CustomersService");
  const id = event.pathParameters!.id!;

  try {
    const customer = await customersService.get(id);

    if (!customer) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Customer not found" }),
      };
    }

    const data = customer.toPrimitives();

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    console.error("Error getting customer", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error getting customer" }),
    };
  }
}

export const handler = middy(getCustomer)
  .use(injectorMiddleware(container))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(databaseConnectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
