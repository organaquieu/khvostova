import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.usersRepository.findOne({
      where: { id: createOrderDto.userId },
    });
    const product = await this.productsRepository.findOne({
      where: { id: createOrderDto.productId },
    });

    if (!user || !product) {
      throw new Error('Пользователь или товар не найдены');
    }

    const order = this.ordersRepository.create({
      user,
      product,
      quantity: createOrderDto.quantity,
    });

    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['user', 'product'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
    if (!order) {
      throw new Error('Заказ не найден');
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error('Заказ не найден');
    }

    if (updateOrderDto.userId) {
      const user = await this.usersRepository.findOne({
        where: { id: updateOrderDto.userId },
      });
      if (!user) {
        throw new Error('Пользователь не найден');
      }
      order.user = user;
    }

    if (updateOrderDto.productId) {
      const product = await this.productsRepository.findOne({
        where: { id: updateOrderDto.productId },
      });
      if (!product) {
        throw new Error('Товар не найден');
      }
      order.product = product;
    }

    if (updateOrderDto.quantity) {
      order.quantity = updateOrderDto.quantity;
    }

    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error('Заказ не найден');
    }
    await this.ordersRepository.remove(order);
  }
}