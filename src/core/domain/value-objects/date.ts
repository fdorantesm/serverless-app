import { ValueObject } from "@/core/domain/value-objects";
import { DateTime as Luxon } from "luxon";

export class DateTime extends ValueObject<Date> {
  constructor(value?: Date) {
    super(value ?? Luxon.now().toJSDate());
  }
}
