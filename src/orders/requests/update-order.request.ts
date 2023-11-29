import { IsDate, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateOrderRequest {
  @IsOptional()
  @IsDate()
  orderAt: Date;

  @IsInt()
  @IsNotEmpty()
  totalPrice: number;

  @IsNotEmpty()
  status: number;

  @IsOptional()
  note?: string;
}
