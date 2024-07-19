import type { Customer } from "@/customers/domain/interfaces/user.interface";

export class CustomerEntity {
  private _id: string;
  private _name: string;
  private _email: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(payload: Customer) {
    this._id = payload.id;
    this._name = payload.name;
    this._email = payload.email;
    this._createdAt = payload.createdAt;
    this._updatedAt = payload.updatedAt;
  }

  public getId(): string {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }

  public getEmail(): string {
    return this._email;
  }

  public getCreatedAt(): Date {
    return this._createdAt;
  }

  public getUpdatedAt(): Date {
    return this._updatedAt;
  }

  public toObject(): Customer {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
