import { Context as LambdaContext } from "aws-lambda";

export interface AppContext {
  get<T>(token: string): T;
}

export interface Context extends LambdaContext {}

export interface FunctionContext extends Context, AppContext {}
