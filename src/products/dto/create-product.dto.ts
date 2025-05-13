import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNumberString, IsEnum } from 'class-validator';
import { ProductType } from '../product.entity';

export class CreateProductDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Загружаемое изображение продукта',
  })
  // image: Express.Multer.File; // Это будет тип, который вы используете в контроллере

  @IsString()
  name: string = 'Название изделия';

  @IsString()
  description: string = 'Описание';

  @IsString()
  prices: string = 'цена..';

  @IsNumberString()
  categoryId: number;

  @IsEnum(ProductType)
  @ApiProperty({ enum: ProductType, enumName: 'ProductType' })
  productType: ProductType;
}