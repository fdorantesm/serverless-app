import type { HandlerLambda } from "middy";

import type {
  AppContext,
  Context,
} from "@/core/infrastructure/http/interfaces/context";

export interface Handler extends HandlerLambda {
  context: Context & AppContext;
}
