import type { Credit } from "@/credits/domain/interfaces/credit.interface";

export type CreditPayload = Omit<
  Credit,
  "id" | "balance" | "createdAt" | "updatedAt"
>;
