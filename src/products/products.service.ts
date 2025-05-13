import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(
    dto: CreateProductDto,
    // image: Express.Multer.File,
  ): Promise<Product> {
    const product = new Product();
    product.name = dto.name;
    product.description = dto.description;
    product.prices = dto.prices.split(',').map((x) => +x);
  
    const newProduct = await this.productRepository.save(product);
  
    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
      relations: ['products'],
    });
  
    if (!category) {
      throw new BadRequestException(`Категория с id=${dto.categoryId} не найдена`);
    }
  
    category.products.push(product);
    await this.categoryRepository.save(category);
  
    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new BadRequestException(`Продукт с id=${id} не найден`);
    }
    return product;
  }

  async findByCategoryId(categoryId: number): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  async update(
  id: number,
  dto: UpdateProductDto,
  image: Express.Multer.File,
): Promise<Product> {
  const toUpdate = await this.productRepository.findOneBy({ id });
  if (!toUpdate) {
    throw new BadRequestException(`Записи с id=${id} не найдено`);
  }

  if (dto.name) toUpdate.name = dto.name;
  if (dto.description) toUpdate.description = dto.description;
  if (dto.prices) toUpdate.prices = dto.prices.split(',').map((x) => +x);

  if (dto.categoryId) {
    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
      relations: ['products'],
    });

    if (!category) {
      throw new BadRequestException(`Категория с id=${dto.categoryId} не найдена`);
    }

    toUpdate.category = category;
  }

  // if (image) {
  //   if (toUpdate.image !== image.filename) {
  //     fs.unlink(`db_images/product/${toUpdate.image}`, (err) => {
  //       if (err) {
  //         console.error(err);
  //       }
  //     });
  //   }
  //   toUpdate.image = image.filename;
  // }

  return this.productRepository.save(toUpdate);
}

  async delete(id: number): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}





// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Product } from './product.entity';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

// @Injectable()
// export class ProductsService {
//   constructor(
//     @InjectRepository(Product)
//     private productsRepository: Repository<Product>,
//   ) {}

//   async create(createProductDto: CreateProductDto): Promise<Product> {
//     const product = this.productsRepository.create(createProductDto);
//     return this.productsRepository.save(product);
//   }

//   async findAll(): Promise<Product[]> {
//     return this.productsRepository.find();
//   }

//   async findOne(id: number): Promise<Product> {
//     const product = await this.productsRepository.findOne({ where: { id } });
//     if (!product) {
//       throw new Error('Товар не найден');
//     }
//     return product;
//   }

//   async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
//     const product = await this.productsRepository.findOne({ where: { id } });
//     if (!product) {
//       throw new Error('Товар не найден');
//     }

//     Object.assign(product, updateProductDto); // Обновляем поля
//     return this.productsRepository.save(product);
//   }

//   async remove(id: number): Promise<void> {
//     const product = await this.productsRepository.findOne({ where: { id } });
//     if (!product) {
//       throw new Error('Товар не найден');
//     }
//     await this.productsRepository.remove(product);
//   }
// }