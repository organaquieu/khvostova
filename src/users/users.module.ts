import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module'; // Импортируем AuthModule
import { CartModule } from '../cart/cart.module'; 

@Module({
  imports: [
    CartModule,
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule), // Используем forwardRef
    forwardRef(() => CartModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Экспортируем UsersService
})
export class UsersModule {}