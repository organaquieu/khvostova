import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity, UserRole } from '../src/users/entities/user.entity';
import { Order } from '../src/orders/order.entity';
import { Cart } from '../src/cart/entities/cart.entity';
import { Product } from '../src/products/product.entity';
import { CategoryEntity } from '../src/category/entities/category.entity';
import { CartItem } from '../src/cart/entities/cart-item.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'postgres',
  entities: [UserEntity, Order, Cart, Product, CategoryEntity, CartItem],
  synchronize: true,
});

async function createAdmin() {
  await AppDataSource.initialize();
  
  const hashedPassword = await bcrypt.hash('secureAdminPassword123', 10);
  
  const userRepository = AppDataSource.getRepository(UserEntity);
  
  const admin = await userRepository.upsert({
    username: 'admin',
    password: hashedPassword,
    role: UserRole.ADMIN,
    firstName: 'Admin',
    email: 'admin@example.com',
    phone: '+79001234567'
  }, ['username']);
  
  console.log('Admin created:', admin);
  
  await AppDataSource.destroy();
}

createAdmin()
  .catch(console.error);