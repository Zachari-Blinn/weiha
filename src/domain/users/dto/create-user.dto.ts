import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Provider } from '../../auth/constants/provider.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username!: string;

  @IsNotEmpty()
  @IsString()
  readonly firstName!: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsEnum(Provider)
  readonly provider?: string;

  @IsOptional()
  @IsString()
  readonly providerId?: string;

  @IsOptional()
  @IsString()
  readonly stripeCustomerId?: string;
}
