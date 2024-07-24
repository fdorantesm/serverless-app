import { Inject, Injectable } from "@/core/injection";
import type { CreditsRepository } from "@/credits/domain/contracts/credits.repository";
import { CreditEntity } from "@/credits/domain/entities/credit.entity";
import type { CreditPayload } from "@/credits/domain/types/credit-payload.type";
import type { CreditModel } from "@/credits/infrastructure/models/credit.model";

@Injectable()
export class CreditsDatabaseRepository implements CreditsRepository {
  constructor(
    @Inject("CreditModel")
    private readonly creditModel: typeof CreditModel
  ) {}

  public async create(
    payload: CreditPayload
  ): Promise<CreditEntity | undefined> {
    const credit = await this.creditModel.create(payload);
    if (credit) {
      return CreditEntity.createFromPrimitives(credit.toJSON());
    }

    return undefined;
  }

  public async list(): Promise<CreditEntity[]> {
    const credits = await this.creditModel.find();
    return credits.map((credit) =>
      CreditEntity.createFromPrimitives(credit.toObject())
    );
  }

  public async get(id: string): Promise<CreditEntity | undefined> {
    const credit = await this.creditModel.findOne({ id });
    if (credit) {
      return CreditEntity.createFromPrimitives(credit.toObject());
    }

    return undefined;
  }

  public async findByCustomerId(customerId: string): Promise<CreditEntity[]> {
    const credits = await this.creditModel.find({ customerId });
    return credits.map((credit) =>
      CreditEntity.createFromPrimitives(credit.toJSON())
    );
  }

  public async update(
    id: string,
    payload: Partial<CreditPayload | undefined>
  ): Promise<CreditEntity | undefined> {
    await this.creditModel.updateOne({ id }, payload);

    return this.get(id);
  }

  public async delete(id: string): Promise<boolean> {
    const credit = await this.creditModel.deleteOne({ id });
    return Boolean(credit);
  }

  public async clear(): Promise<void> {
    await this.creditModel.deleteMany({});
  }
}
