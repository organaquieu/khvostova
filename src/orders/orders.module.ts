import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product])], // Подключение сущностей
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}