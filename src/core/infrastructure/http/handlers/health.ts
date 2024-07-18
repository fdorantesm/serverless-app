import middy from "middy";
import { httpErrorHandler, httpHeaderNormalizer } from "middy/middlewares";

export async function health() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "ok",
    }),
  };
}

export const handler = middy(health)
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
