import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { Order } from '../../orders/order.entity';
  import { Cart } from '../../cart/entities/cart.entity';

  export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
  }

  
  //добавили роли емае
  @Entity('users')
  export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.USER,
    })
    role: UserRole;

    @Column({ name: 'first_name', nullable: true })
    firstName: string;
  
    @Column({ unique: true, nullable: false })
    username: string;
  
    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

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

    @OneToMany(() => Order, (order: Order) => order.user) // Указываем тип для order
    orders: Order[];
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => Cart, cart => cart.user)
  carts: Cart[];


   
  }
  
// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Order } from '../orders/order.entity';

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   email: string;

//   @Column()
//   password: string;

//   @Column()
//   firstName: string;

//   @Column()
//   lastName: string;

//   @Column()
//   phone: string;

//   @Column({ default: 'user' }) // По умолчанию роль 'user'
//   role: string;

//   @OneToMany(() => Order, (order) => order.user)
//   orders: Order[];
// }