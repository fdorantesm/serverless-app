import type { CreditEntity } from "@/credits/domain/entities/credit.entity";
import type { CreditPayload } from "@/credits/domain/types/credit-payload.type";

export interface CreditsRepository {
  create(payload: CreditPayload): Promise<CreditEntity>;
  list(): Promise<CreditEntity[]>;
  get(id: string): Promise<CreditEntity>;
  update(id: string, payload: CreditPayload): Promise<CreditEntity>;
  delete(id: string): Promise<boolean>;
}
