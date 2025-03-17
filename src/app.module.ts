import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Тип базы данных
      host: 'localhost', // Хост базы данных
      port: 5432, // Порт базы данных
      username: 'postgres', // Имя пользователя
      password: '123', // Пароль
      database: 'postgres', // Название базы данных
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Автоматическое подключение сущностей
      synchronize: true, // Автоматическая синхронизация схемы (только для разработки!)
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController], // Контроллеры
  providers: [AppService], // Сервисы
})
export class AppModule {}