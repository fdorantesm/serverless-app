import { Injectable } from "@/core/injection";
import type { CreditPayload } from "@/credits/domain/types/credit-payload.type";

@Injectable()
export class CreditsRepository {
  constructor() {}

  public async create(payload: CreditPayload) {
    return payload;
  }

  public async list() {
    return [];
  }

  public async get(id: string) {
    return id;
  }

  public async update(id: string, payload: CreditPayload) {
    return payload;
  }

  public async delete(id: string) {
    return true;
  }
}
