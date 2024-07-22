import type { CreditEntity } from "@/credits/domain/entities/credit.entity";
import type { Credit } from "@/credits/domain/interfaces/credit.interface";
import type { CreditPayload } from "@/credits/domain/types/credit-payload.type";

export interface CreditsService {
  create(payload: CreditPayload): Promise<CreditEntity>;
  list(): Promise<CreditEntity[]>;
  get(id: string): Promise<CreditEntity>;
  update(id: string, payload: Partial<Credit>): Promise<CreditEntity>;
  delete(id: string): Promise<boolean>;
  findByCustomerId(customerId: string): Promise<CreditEntity[]>;
}
