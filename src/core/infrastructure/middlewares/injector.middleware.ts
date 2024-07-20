import type { NextFunction } from "middy";

import type { Container } from "@/core/injection";
import type { Handler } from "@/core/infrastructure/http/interfaces/handler";

export const injectorMiddleware = (container?: Container) => {
  return {
    before: async (handler: Handler) => {
      if (container) {
        handler.context.get = (key: string) => container.get(key);
      }
    },
  };
};
