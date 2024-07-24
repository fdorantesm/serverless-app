// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require("../../../../../package.json");

import middy from "middy";
import { httpErrorHandler, httpHeaderNormalizer } from "middy/middlewares";

export async function info() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      version,
    }),
  };
}

export const handler = middy(info)
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
