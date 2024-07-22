export class CreditNotFoundException extends Error {
  constructor(creditId: string) {
    super(`Credit ${creditId} not found`);
    this.name = "CreditNotFoundException";
  }
}
