import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './configs/postgres.config';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module'; // Добавьте этот импорт
import { UserEntity } from './users/entities/user.entity';
import { Order } from './orders/order.entity';
import { Product } from './products/product.entity';
import { CategoryEntity } from './category/entities/category.entity';
import { CartModule } from './cart/cart.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    AdminModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     ...getPostgresConfig(configService),
    //     entities: [UserEntity, Order, Product, CategoryEntity], // Явно укажите все сущности
    //     synchronize: true, // Только для разработки!
    //   }),
    // }),
    CategoryModule,
    ProductsModule,
    UsersModule,
    AuthModule,
    OrdersModule, // Добавьте OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}



// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       envFilePath: '.env',
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: getPostgresConfig,
//     }),
//     CategoryModule,
//     ProductsModule,
//     UsersModule,
//     AuthModule,
//     OrdersModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}



// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { APP_GUARD } from '@nestjs/core';
// import { ConfigModule } from '@nestjs/config';
// // import { RolesGuard } from './auth/guards/roles.guard';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { ProductsModule } from './products/products.module';
// import { OrdersModule } from './orders/orders.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: '123',
//       database: 'postgres',
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       synchronize: true,
//     }),
//     UsersModule,
//     AuthModule,
//     ProductsModule,
//     OrdersModule,
//   ],
//   controllers: [AppController],
//   providers: [
//     AppService,
//     // {
//     //   provide: APP_GUARD,
//     //   // useClass: RolesGuard, // Регистрируем RolesGuard как глобальный гард
//     // },
//   ],
// })
// export class AppModule {}