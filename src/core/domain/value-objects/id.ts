import { v4 as uuid } from "uuid";

import { ValueObject } from "@/core/domain/value-objects";

export class Id extends ValueObject<string> {
  constructor(id?: string) {
    super(id ?? uuid());
  }
}
