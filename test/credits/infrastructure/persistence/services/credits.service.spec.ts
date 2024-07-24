import { container } from "#/container";
import { creditsMock } from "#/credits/mocks/credits.mock";
import type { CreditsService } from "@/credits/domain/contracts/credits.service";
import { CreditEntity } from "@/credits/domain/entities/credit.entity";
import type { Credit } from "@/credits/domain/interfaces/credit.interface";
import type { CreditPayload } from "@/credits/domain/types/credit-payload.type";
import type Datastore from "nedb-promises";

describe("CustomersService", () => {
  const creditsService = container.get<CreditsService>("CreditsService");
  const creditModel = container.get<Datastore<Credit>>("CreditModel");
  const mock = creditsMock[0];
  const mockPayload: CreditPayload = {
    customerId: mock.getCustomerId(),
    limit: mock.getLimit(),
    currency: mock.getCurrency(),
    cutOffDay: mock.getCutOffDay(),
  };

  beforeEach(async () => {
    await creditsService.clear();
  });

  it("should create a new credit for a customer", async () => {
    const credit = await creditsService.create(
      CreditEntity.createToPrimitives(mockPayload)
    );

    expect(credit).toBeDefined();
    expect(credit.getId()).toBeDefined();
    expect(credit.getCustomerId()).toBe("1");
    expect(credit.getLimit()).toBe(1000);
    expect(credit.getCurrency()).toBe("USD");
    expect(credit.getCutOffDay()).toBe(1);
    expect(credit.getBalance()).toBe(0);
    expect(credit.getCreatedAt()).toBeDefined();
  });

  it("should return a list of credits", async () => {
    await creditModel.insert(creditsMock[0].toPrimitives());
    await creditModel.insert(creditsMock[1].toPrimitives());

    const credits = await creditsService.list();

    expect(credits).toHaveLength(2);

    credits.map((credit) => {
      expect(credit instanceof CreditEntity).toBe(true);
      expect(credit.getId()).toBeDefined();
      expect(credit.getCustomerId()).toBeDefined();
      expect(credit.getLimit()).toBeDefined();
      expect(credit.getCurrency()).toBeDefined();
      expect(credit.getCutOffDay()).toBeDefined();
      expect(credit.getBalance()).toBeDefined();
      expect(credit.getCreatedAt()).toBeDefined();
    });

    const credit1 = credits.find((credit) => credit.getId() === "1");
    const credit2 = credits.find((credit) => credit.getId() === "2");

    expect(credit1).toStrictEqual(creditsMock[0]);
    expect(credit2).toStrictEqual(creditsMock[1]);
  });

  it("should find a credit by id", async () => {
    await creditModel.insert(creditsMock[0].toPrimitives());

    const credit = await creditsService.get("1");

    expect(credit).toBeDefined();
    expect(credit instanceof CreditEntity).toBe(true);
    expect(credit.getId()).toBe("1");
    expect(credit.getCustomerId()).toBe("1");
    expect(credit.getLimit()).toBe(1000);
    expect(credit.getCurrency()).toBe("USD");
    expect(credit.getCutOffDay()).toBe(1);
    expect(credit.getBalance()).toBe(0);
    expect(credit.getCreatedAt()).toBeDefined();
  });

  it("should find credits by customer id", async () => {
    await creditModel.insert(creditsMock[0].toPrimitives());
    await creditModel.insert(creditsMock[1].toPrimitives());

    const credits = await creditsService.findByCustomerId("3");

    expect(credits).toHaveLength(1);

    const credit = credits[0];

    expect(credit instanceof CreditEntity).toBe(true);
    expect(credit.getId()).toBe("2");
    expect(credit.getCustomerId()).toBe("3");
    expect(credit.getLimit()).toBe(2000);
    expect(credit.getCurrency()).toBe("USD");
    expect(credit.getCutOffDay()).toBe(2);
    expect(credit.getBalance()).toBe(0);
    expect(credit.getCreatedAt()).toBeDefined();
  });

  it("should credit limit for a credit", async () => {
    const mock = await creditModel.insert(creditsMock[0].toPrimitives());
    const entity = CreditEntity.createFromPrimitives(mock);

    entity.setLimit(2500);

    const credit = await creditsService.update("1", entity.toPrimitives());

    expect(credit).toBeDefined();
    expect(credit instanceof CreditEntity).toBe(true);
    expect(credit.getId()).toBe("1");
    expect(credit.getCustomerId()).toBe("1");
    expect(credit.getLimit()).toBe(2500);
    expect(credit.getCurrency()).toBe("USD");
    expect(credit.getCutOffDay()).toBe(1);
    expect(credit.getBalance()).toBe(0);
    expect(credit.getCreatedAt()).toBeDefined();
  });

  it("should update balance for a credit", async () => {
    const mock = await creditModel.insert(creditsMock[0].toPrimitives());
    const entity = CreditEntity.createFromPrimitives(mock);

    entity.setBalance(500);

    const credit = await creditsService.update(mock.id, entity.toPrimitives());

    expect(credit).toBeDefined();
    expect(credit instanceof CreditEntity).toBe(true);
    expect(credit.getId()).toBe("1");
    expect(credit.getCustomerId()).toBe("1");
    expect(credit.getLimit()).toBe(1000);
    expect(credit.getCurrency()).toBe("USD");
    expect(credit.getCutOffDay()).toBe(1);
    expect(credit.getBalance()).toBe(500);
    expect(credit.getCreatedAt()).toBeDefined();
  });
});
