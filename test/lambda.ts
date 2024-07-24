import { container } from "#/container";
import type { Event as IEvent, FunctionContext } from "@/core";

export const Context = {
  get(key: string) {
    return container.get(key);
  },
} as FunctionContext;

export const Event = {} as IEvent;
