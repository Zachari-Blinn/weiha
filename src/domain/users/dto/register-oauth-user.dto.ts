import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Provider } from '../../auth/constants/provider.enum';

export class RegisterOAuthUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  readonly providerId: string;

  @IsNotEmpty()
  @IsEnum(Provider)
  readonly provider: Provider;
}
