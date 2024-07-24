import type Datastore from "nedb-promises";

import { Inject, Injectable } from "@/core/injection";
import { CreditEntity } from "@/credits/domain/entities/credit.entity";
import type { Credit } from "@/credits/domain/interfaces/credit.interface";
import type { CreditPayload } from "@/credits/domain/types/credit-payload.type";

@Injectable()
export class CreditsMemoryRepository {
  constructor(
    @Inject("CreditModel")
    private readonly creditModel: Datastore<Credit>
  ) {}

  public async create(
    payload: CreditPayload
  ): Promise<CreditEntity | undefined> {
    const credit = await this.creditModel.insert(payload);
    if (credit) {
      return CreditEntity.createFromPrimitives(credit);
    }

    return undefined;
  }

  public async list(filter?: Partial<Credit>): Promise<CreditEntity[]> {
    const credits = await this.creditModel.find(filter ?? {});
    return credits.map((credit) => CreditEntity.createFromPrimitives(credit));
  }

  public async get(id: string): Promise<CreditEntity | undefined> {
    const credit = await this.creditModel.findOne({ id });
    if (credit) {
      return CreditEntity.createFromPrimitives(credit);
    }

    return undefined;
  }

  public async findByCustomerId(customerId: string): Promise<CreditEntity[]> {
    const credits = await this.creditModel.find({ customerId });
    return credits.map((credit) => CreditEntity.createFromPrimitives(credit));
  }

  public async update(
    id: string,
    payload: Partial<CreditPayload>
  ): Promise<CreditEntity | undefined> {
    const credit = await this.creditModel.updateOne(
      { id },
      {
        $set: payload,
      },
      {
        returnUpdatedDocs: true,
        upsert: true,
      }
    );

    if (credit) {
      return CreditEntity.createFromPrimitives(credit);
    }

    return undefined;
  }

  public async clear(): Promise<void> {
    await this.creditModel.remove({}, { multi: true });
  }
}
