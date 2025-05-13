import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Response,
} from '@nestjs/common';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult } from 'typeorm';

import { fileStorage } from '../products/storage';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

@ApiTags('product')
@Controller('product')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  create(
    @Body() dto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Product> {
    return this.productService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'categoryId', required: false })
  findAll(@Query('categoryId') categoryId: number): Promise<Product[]> {
    if (categoryId) return this.productService.findByCategoryId(categoryId);
    else return this.productService.findAll();
  }

  @Get('/image/:path')
  download(@Param('path') path: string, @Response() response) {
    return response.sendFile(path, { root: './db_images/product' });
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Product> {
    return this.productService.update(+id, dto, image);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.delete(+id);
  }
}







// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Put,
//   Delete,
//   UseGuards,
// } from '@nestjs/common';
// import { ProductsService } from './products.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt.guard';
// // import { RolesGuard } from '../auth/guards/roles.guard';
// // import { Roles } from '../auth/decorators/roles.decorator';

// @Controller('products')
// @UseGuards(RolesGuard)
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   @Post()
//   @UseGuards(JwtAuthGuard) // Проверка JWT-аутентификации
//   @Roles('manager') // Только менеджер может добавлять продукты
//   async create(@Body() createProductDto: CreateProductDto) {
//     return this.productsService.create(createProductDto);
//   }

//   @Get()
//   async findAll() {
//     return this.productsService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: number) {
//     return this.productsService.findOne(id);
//   }

//   @Put(':id')
//   @UseGuards(JwtAuthGuard)
//   async update(
//     @Param('id') id: number,
//     @Body() updateProductDto: UpdateProductDto,
//   ) {
//     return this.productsService.update(id, updateProductDto);
//   }

//   @Delete(':id')
//   @UseGuards(JwtAuthGuard)
//   async remove(@Param('id') id: number) {
//     return this.productsService.remove(id);
//   }
// }