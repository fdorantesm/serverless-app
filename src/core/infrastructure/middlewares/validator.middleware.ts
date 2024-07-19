import { validateOrReject, type ValidationError } from "class-validator";
import { plainToClassFromExist } from "class-transformer";
import type { HandlerLambda } from "middy";

export const validationMiddleware = (dto: any) => {
  return {
    before: async (handler: HandlerLambda) => {
      const body = JSON.parse(handler.event.body || "{}");
      const object = plainToClassFromExist(new dto(), body);
      try {
        await validateOrReject(object);
        handler.event.body = JSON.stringify(object);
      } catch (errors) {
        console.log({ errors });
        const flattenedErrors = flattenValidationErrors(errors);
        throw {
          statusCode: 400,
          body: JSON.stringify({
            message: "Validation error",
            data: flattenedErrors,
          }),
        };
      }
    },
  };
};

function flattenValidationErrors(errors: ValidationError[]): string[] {
  let messages: string[] = [];

  errors.forEach((error) => {
    if (error.constraints) {
      messages = messages.concat(Object.values(error.constraints));
    }

    if (error.children && error.children.length > 0) {
      messages = messages.concat(flattenValidationErrors(error.children));
    }
  });

  return messages;
}
