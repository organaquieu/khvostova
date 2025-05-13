import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { AuthModule } from '../auth/auth.module'; // Импортируем AuthModule
import { UsersModule } from '../users/users.module'; // Импортируем UsersModule
import { CategoryModule } from '../category/category.module'; 
import { CategoryEntity } from '../category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, CategoryEntity ]),
    forwardRef(() => CategoryModule),
    forwardRef(() => AuthModule), // Используем forwardRef для AuthModule
    forwardRef(() => UsersModule), // Используем forwardRef для UsersModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}