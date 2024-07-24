import { CreditEntity } from "@/credits/domain/entities/credit.entity";

export const creditsMock = [
  CreditEntity.createFromPrimitives({
    id: "1",
    customerId: "1",
    balance: 0,
    limit: 1000,
    currency: "USD",
    cutOffDay: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  CreditEntity.createFromPrimitives({
    id: "2",
    customerId: "3",
    balance: 0,
    limit: 2000,
    currency: "USD",
    cutOffDay: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
];
