import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  public readonly name: string;

  @IsEmail()
  public readonly email: string;

  @IsPhoneNumber()
  public readonly phone: string;
}
