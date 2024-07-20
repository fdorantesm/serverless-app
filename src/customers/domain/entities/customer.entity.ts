import { DateTime } from "@/core/domain/value-objects/date";
import { Id } from "@/core/domain/value-objects/id";
import type { Customer } from "@/customers/domain/interfaces/customer.interface";
import type { CustomerPayload } from "@/customers/domain/types/customer.payload";

export class CustomerEntity {
  private _id: Id;
  private _name: string;
  private _email: string;
  private _phone: string;
  private _createdAt: DateTime;
  private _updatedAt: DateTime;

  private constructor(payload: Customer) {
    this._id = new Id(payload.id);
    this._name = payload.name;
    this._email = payload.email;
    this._phone = payload.phone;
    this._createdAt = new DateTime(payload.createdAt);
    this._updatedAt = new DateTime(payload.updatedAt);
  }

  public static createToPrimitives(payload: CustomerPayload): Customer {
    return new CustomerEntity({
      id: new Id().getValue(),
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      createdAt: new DateTime().getValue(),
      updatedAt: new DateTime().getValue(),
    }).toPrimitives();
  }

  public static createFromPrimitives(payload: Customer): CustomerEntity {
    return new CustomerEntity({
      id: new Id(payload.id).getValue(),
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      createdAt: new DateTime(payload.createdAt).getValue(),
      updatedAt: new DateTime(payload.updatedAt).getValue(),
    });
  }

  public getId(): Id {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }

  public getEmail(): string {
    return this._email;
  }

  public getCreatedAt(): DateTime {
    return this._createdAt;
  }

  public getUpdatedAt(): DateTime {
    return this._updatedAt;
  }

  public getPhone(): string {
    return this._phone;
  }

  public setName(name: string): void {
    this._name = name;
  }

  public setEmail(email: string): void {
    this._email = email;
  }

  public setPhone(phone: string): void {
    this._phone = phone;
  }

  public toPrimitives(): Customer {
    return {
      id: this._id.getValue(),
      name: this._name,
      email: this._email,
      phone: this._phone,
      createdAt: this._createdAt.getValue(),
      updatedAt: this._updatedAt.getValue(),
    };
  }
}
