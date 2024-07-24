import type { CreditEntity } from "@/credits/domain/entities/credit.entity";
import type { CreditPayload } from "@/credits/domain/types/credit-payload.type";

export interface CreditsRepository {
  create(payload: CreditPayload): Promise<CreditEntity | undefined>;
  list(): Promise<CreditEntity[]>;
  get(id: string): Promise<CreditEntity | undefined>;
  update(id: string, payload: CreditPayload): Promise<CreditEntity | undefined>;
  delete(id: string): Promise<boolean>;
  findByCustomerId(customerId: string): Promise<CreditEntity[]>;
  clear(): Promise<void>;
}
