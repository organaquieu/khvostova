import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from '../orders/order.entity'
import { CategoryEntity } from '../category/entities/category.entity';

export enum ProductType {
  DRESS = 'dress',
  BRACELET = 'bracelet',
  NECKLACE = 'necklace',
}

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('int', { array: true })
  prices: number[];

  @Column({ nullable: true })
  shoulders: number;

  @Column({ nullable: true })
  chest: number;

  @Column({ nullable: true })
  waist: number;

  @Column({ nullable: true })
  hips: number;

  @Column({ nullable: true })
  wrist: number;

  @Column({ nullable: true })
  neck: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[]; // Массив заказов
}




// import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
// import { Order } from '../orders/order.entity';
// import { CategoryEntity } from '../category/entities/category.entity'; 

// @Entity()
// export class Product {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   description: string;

//   @Column('decimal', { precision: 10, scale: 2 })
//   price: number;

//   @Column()
//   imageUrl: string;

//   // Связь "один ко многим" с сущностью Order
  

//   // Связь "многие к одному" с сущностью CategoryEntity
//   @ManyToOne(() => CategoryEntity, (category) => category.products)
//   category: CategoryEntity; // Свойство для связи с категорией
// }