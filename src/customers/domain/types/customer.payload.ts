import type { Customer } from "@/customers/domain/interfaces/customer.interface";

export type CustomerPayload = Omit<
  Customer,
  "id" | "credits" | "createdAt" | "updatedAt"
>;
