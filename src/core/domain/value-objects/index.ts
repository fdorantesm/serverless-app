export abstract class ValueObject<T> {
  protected readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  public equals(vo: ValueObject<T>): boolean {
    return this.value === vo.value;
  }

  public isNull(): boolean {
    return this.value === null;
  }

  public isDefined(): boolean {
    return this.value !== undefined;
  }

  public getValue(): T {
    return this.value;
  }

  public toString(): string {
    return String(this.value);
  }
}
