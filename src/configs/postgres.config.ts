import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CartItem } from '../cart/entities/cart-item.entity';


export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres', // Это критически важно
  host: configService.get('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  synchronize: configService.get('DATABASE_SYNCHRONIZE') === 'true',
  autoLoadEntities: true,
  logging: true, // Для отладки
});


// import { DataSource } from 'typeorm';

// export const AppDataSource = new DataSource({
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: '123', // Убедитесь, что это строка
//     database: 'postgres',
//     synchronize: true,
//     logging: true,
// });





//   return {
//     type: 'postgres',
//     host: configService.get<string>('DATABASE_HOST') ?? 'localhost', // Укажите значение по умолчанию
//     port: parseInt(configService.get<string>('DATABASE_PORT') ?? '5432'), // Укажите значение по умолчанию
//     username: configService.get<string>('DATABASE_USERNAME') ?? 'user', // Укажите значение по умолчанию
//     password: configService.get<string>('DATABASE_PASSWORD') ?? 'password', // Укажите значение по умолчанию
//     database: configService.get<string>('DATABASE_NAME') ?? 'database', // Укажите значение по умолчанию
//     synchronize: configService.get<string>('DATABASE_SYNCHRONIZE') === 'true',
//     autoLoadEntities: true,
//     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   };
// };