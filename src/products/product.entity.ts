import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity'; // Импортируйте сущность Order

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  imageUrl: string;

  // Связь "один ко многим" с сущностью Order
  @OneToMany(() => Order, (order) => order.product)
  orders: Order[]; // Массив заказов
}