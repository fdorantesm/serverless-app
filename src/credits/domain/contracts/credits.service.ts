import type { Credit } from "@/credits/domain/interfaces/credit.interface";
import type { CreditPayload } from "@/credits/domain/types/credit-payload.type";

export interface CreditsService {
  create(payload: CreditPayload): Promise<CreditPayload>;
  list(): Promise<Credit[]>;
  get(id: string): Promise<Credit>;
  update(id: string, payload: CreditPayload): Promise<CreditPayload>;
  delete(id: string): Promise<boolean>;
}
