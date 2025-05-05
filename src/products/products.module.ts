import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { AuthModule } from '../auth/auth.module'; // Импортируем AuthModule
import { UsersModule } from '../users/users.module'; // Импортируем UsersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => AuthModule), // Используем forwardRef для AuthModule
    forwardRef(() => UsersModule), // Используем forwardRef для UsersModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}