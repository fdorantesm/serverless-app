import { CreditEntity } from "@/credits/domain/entities/credit.entity";
import type { Credit } from "@/credits/domain/interfaces/credit.interface";

const creditData: Credit = {
  id: "1",
  balance: 0,
  currency: "USD",
  customerId: "1",
  cutOffDay: 1,
  limit: 1000,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("CreditEntity", () => {
  it("should create a CreditEntity from primitives values", () => {
    const credit = CreditEntity.createFromPrimitives(creditData);
    expect(credit.getId()).toBe(creditData.id);
    expect(credit.getBalance()).toBe(creditData.balance);
    expect(credit.getCurrency()).toBe(creditData.currency);
    expect(credit.getCustomerId()).toBe(creditData.customerId);
    expect(credit.getLimit()).toBe(creditData.limit);
    expect(credit.getCutOffDay()).toBe(creditData.cutOffDay);
    expect(credit.getCreatedAt()).toBe(creditData.createdAt);
    expect(credit.getUpdatedAt()).toBe(creditData.updatedAt);
  });

  it("should create a CreditEntity from a plain object", () => {
    const credit = CreditEntity.createToPrimitives({
      currency: creditData.currency,
      customerId: creditData.customerId,
      limit: creditData.limit,
      cutOffDay: creditData.cutOffDay,
    });

    expect(credit).toHaveProperty("id");
    expect(credit).toHaveProperty("balance");
    expect(credit).toHaveProperty("createdAt");
    expect(credit).toHaveProperty("updatedAt");
    expect(credit.currency).toBe(creditData.currency);
    expect(credit.customerId).toBe(creditData.customerId);
    expect(credit.limit).toBe(creditData.limit);
    expect(credit.cutOffDay).toBe(creditData.cutOffDay);
  });

  it("should update the balance and limit", () => {
    const credit = CreditEntity.createFromPrimitives(creditData);
    credit.setBalance(100);
    credit.setLimit(2000);

    expect(credit.getBalance()).toBe(100);
    expect(credit.getCurrency()).toBe(creditData.currency);
    expect(credit.getLimit()).toBe(2000);
    expect(credit.getCutOffDay()).toBe(creditData.cutOffDay);
  });
});
