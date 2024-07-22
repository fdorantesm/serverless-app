import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class UpdateCustomerDto {
  @IsOptional()
  @IsEmail()
  public readonly email?: string;

  @IsOptional()
  @IsString()
  @IsDefined()
  public readonly name?: string;

  @IsPhoneNumber()
  public readonly phone: string;
}
