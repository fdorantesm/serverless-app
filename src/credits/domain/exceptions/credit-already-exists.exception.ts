export class CreditAlreadyExistsException extends Error {
  constructor(creditId: string) {
    super(`Customer has already a credit with id ${creditId}`);
    this.name = "CreditAlreadyExistsException";
  }
}
