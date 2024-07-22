import { IsISO4217CurrencyCode, IsPositive, Max, Min } from "class-validator";

export class CreateCustomerCreditDto {
  @IsPositive()
  public readonly limit: number;

  @IsPositive()
  @Min(1)
  @Max(31)
  public readonly cutOffDay: number;

  @IsISO4217CurrencyCode()
  public readonly currency: string;
}
