import { Inject, Injectable } from "@/core/injection";
import { CreditEntity } from "@/credits/domain/entities/credit.entity";
import type { CreditPayload } from "@/credits/domain/types/credit-payload.type";
import type { CreditModel } from "@/credits/infrastructure/models/credit.model";

@Injectable()
export class CreditsRepository {
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
    payload: Partial<CreditPayload>
  ): Promise<CreditEntity | undefined> {
    const credit = await this.creditModel
      .updateOne({ id }, payload)
      .then(() => this.get(id));

    if (credit) {
      return credit;
    }

    return undefined;
  }
}
