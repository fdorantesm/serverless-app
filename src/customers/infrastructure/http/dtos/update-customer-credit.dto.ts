import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class UpdateCustomerCreditDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsNumber()
  @IsOptional()
  balance: number;
}
