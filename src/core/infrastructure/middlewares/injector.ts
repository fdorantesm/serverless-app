import { container } from "@/core/infrastructure/container/container";
import type { AppContext, Context } from "@/core";
import type { HandlerLambda, NextFunction } from "middy";

type Handler = HandlerLambda & {
  context: Context & AppContext;
};

export const injectorMiddleware = () => {
  return {
    before: async (handler: Handler, next: NextFunction) => {
      handler.context.get = (key: string) => container.get(key);
      next();
    },
  };
};
