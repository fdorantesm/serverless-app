import type { HandlerLambda } from "middy";

import type { AppContext, Context } from "@/core";
import type { MongoDBConnection } from "@/database/connection";

type Handler = HandlerLambda & {
  context: Context & AppContext;
};

export const databaseConnectorMiddleware = () => {
  return {
    before: async (handler: Handler) => {
      handler.context.callbackWaitsForEmptyEventLoop = false;
      if (handler.context.get) {
        await handler.context
          .get<MongoDBConnection>("DatabaseConnection")
          .connect();
      }
    },
  };
};
