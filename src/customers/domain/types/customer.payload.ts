import type { Customer } from "@/customers/domain/interfaces/user.interface";

export type CustomerPayload = Omit<Customer, "id" | "createdAt" | "updatedAt">;
