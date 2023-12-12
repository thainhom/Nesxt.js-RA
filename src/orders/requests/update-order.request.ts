import { IsDate, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateOrderRequest {
  @IsNotEmpty()
  status: number;

  @IsOptional()
  note?: string;
}
