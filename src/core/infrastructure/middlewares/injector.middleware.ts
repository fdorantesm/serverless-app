import type { AppContext, Context } from "@/core";
import type { Container } from "inversify";
import type { HandlerLambda, NextFunction } from "middy";

type Handler = HandlerLambda & {
  context: Context & AppContext;
};

export const injectorMiddleware = (container?: Container) => {
  return {
    before: async (handler: Handler, next: NextFunction) => {
      if (container) {
        handler.context.get = (key: string) => container.get(key);
      }
      next();
    },
  };
};
