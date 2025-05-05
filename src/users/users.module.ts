import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module'; // Импортируем AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule), // Используем forwardRef
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Экспортируем UsersService
})
export class UsersModule {}