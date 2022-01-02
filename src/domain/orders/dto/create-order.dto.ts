import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Currency } from "../../constants/currency.enum";
import User from "../../users/user.entity";
import { OrderStatus } from "../constants/order-status.enum";

export class CreateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  public status?: OrderStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public amount?: number;

  @IsOptional()
  @IsEnum(Currency)
  public currency?: Currency;

  @IsOptional()
  @IsBoolean()
  public isPaid?: boolean;

  @IsNotEmpty()
  public user!: User;
}
