import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateOrderRequest {
  @PrimaryGeneratedColumn()
  order_id: number;

  note?: string;
  cart: CreateOrderDetailsRequest[];
}
export class CreateOrderDetailsRequest {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}
