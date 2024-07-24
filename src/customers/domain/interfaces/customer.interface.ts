import type { Credit } from "@/credits/domain/interfaces/credit.interface";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  // virtual properties
  credits?: Credit[];
}
