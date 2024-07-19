import type { Credit } from "@/credits/domain/interfaces/credit.interface";

export class CreditEntity {
  private _id: string;
  private _customerId: string;
  private _amount: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(payload: Credit) {
    this._id = payload.id;
    this._customerId = payload.customerId;
    this._amount = payload.amount;
    this._createdAt = payload.createdAt;
    this._updatedAt = payload.updatedAt;
  }

  public getId(): string {
    return this._id;
  }

  public getCustomerId(): string {
    return this._customerId;
  }

  public getAmount(): number {
    return this._amount;
  }

  public getCreatedAt(): Date {
    return this._createdAt;
  }

  public getUpdatedAt(): Date {
    return this._updatedAt;
  }

  public toObject(): Credit {
    return {
      id: this._id,
      customerId: this._customerId,
      amount: this._amount,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
