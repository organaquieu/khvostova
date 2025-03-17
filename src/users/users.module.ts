import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Подключение сущности User
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Экспорт сервиса, чтобы он был доступен в других модулях
})
export class UsersModule {} // Экспорт модуля