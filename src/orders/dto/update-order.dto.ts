import { IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  productId?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}