import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Настройка глобальной валидации
  app.useGlobalPipes(new ValidationPipe());

  // Настройка CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Online Store API')
    .setDescription('API для онлайн-каталога бренда одежды')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Запуск сервера
  const port = 3001; // Изменил порт на 3001, так как фронтенд использует этот порт
  await app.listen(port);
  console.log(`Сервер запущен на http://localhost:${port}`);
  console.log(`Swagger UI доступен по адресу: http://localhost:${port}/api`);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common'; // Для валидации
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Для Swagger

// async function bootstrap() {
//   // Создаём экземпляр приложения
//   const app = await NestFactory.create(AppModule);

//   // Настройка глобальной валидации
//   app.useGlobalPipes(new ValidationPipe());

//   app.enableCors({
//     origin: 'http://localhost:3000', // URL вашего фронтенда
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     credentials: true,
//   });

//   // Настройка Swagger (документация API)
//   const config = new DocumentBuilder()
//     .setTitle('Online Store API')
//     .setDescription('API для онлайн-каталога бренда одежды')
//     .setVersion('1.0')
//     .addBearerAuth() // Добавляем поддержку JWT
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   // Запуск сервера на всех интерфейсах (0.0.0.0)
//   const port = 5000;
//   await app.listen(port, '0.0.0.0');
//   console.log(`Сервер запущен на http://localhost:${port}`);
//   console.log(`Сервер также доступен по ZeroTier IP: http://192.168.195.168:${port}`);
//   console.log(`Swagger UI доступен по адресу: http://192.168.195.168:${port}/api`);
// }
// bootstrap();
