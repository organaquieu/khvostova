import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateMeasurementsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  shoulders?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  chest?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  waist?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  hips?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  wrist?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  neck?: number;
}