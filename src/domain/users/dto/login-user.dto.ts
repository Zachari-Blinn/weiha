import { IsNotEmpty, IsString } from "class-validator";

export class LoginLocalUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
