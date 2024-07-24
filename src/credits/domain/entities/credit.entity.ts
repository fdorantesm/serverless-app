import { DateTime } from "@/core/domain/value-objects/date";
import { Id } from "@/core/domain/value-objects/id";
import type { Credit } from "@/credits/domain/interfaces/credit.interface";
import type { CreditPayload } from "@/credits/domain/types/credit-payload.type";

export class CreditEntity {
  private _id: string;
  private _currency: string;
  private _customerId: string;
  private _limit: number;
  private _balance: number;
  private _cutOffDay: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(payload: Credit) {
    this._id = payload.id;
    this._currency = payload.currency;
    this._customerId = payload.customerId;
    this._limit = payload.limit;
    this._balance = payload.balance;
    this._cutOffDay = payload.cutOffDay;
    this._createdAt = payload.createdAt;
    this._updatedAt = payload.updatedAt;
  }

  public static createToPrimitives(payload: CreditPayload): Credit {
    return new CreditEntity({
      id: new Id().getValue(),
      currency: payload.currency,
      customerId: payload.customerId,
      limit: payload.limit,
      balance: 0,
      cutOffDay: payload.cutOffDay,
      createdAt: new DateTime().getValue(),
      updatedAt: new DateTime().getValue(),
    }).toPrimitives();
  }

  public static createFromPrimitives(payload: Credit): CreditEntity {
    return new CreditEntity({
      id: new Id(payload.id).getValue(),
      currency: payload.currency,
      customerId: payload.customerId,
      limit: payload.limit,
      balance: payload.balance,
      cutOffDay: payload.cutOffDay,
      createdAt: new DateTime(payload.createdAt).getValue(),
      updatedAt: new DateTime(payload.updatedAt).getValue(),
    });
  }

  public getId(): string {
    return this._id;
  }

  public getCustomerId(): string {
    return this._customerId;
  }

  public getLimit(): number {
    return this._limit;
  }

  public getCurrency(): string {
    return this._currency;
  }

  public getBalance(): number {
    return this._balance;
  }

  public getCreatedAt(): Date {
    return this._createdAt;
  }

  public getUpdatedAt(): Date {
    return this._updatedAt;
  }

  public getCutOffDay(): number {
    return this._cutOffDay;
  }

  public setBalance(balance: number): void {
    this._balance = balance;
    this._updatedAt = new Date();
  }

  public setLimit(limit: number): void {
    this._limit = limit;
    this._updatedAt = new Date();
  }

  public toPrimitives(): Credit {
    return {
      id: this._id,
      currency: this._currency,
      customerId: this._customerId,
      limit: this._limit,
      balance: this._balance,
      cutOffDay: this._cutOffDay,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
