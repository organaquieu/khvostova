import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Для валидации
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Для Swagger

async function bootstrap() {
  // Создаём экземпляр приложения
  const app = await NestFactory.create(AppModule);

  // Настройка глобальной валидации
  app.useGlobalPipes(new ValidationPipe());

  // Настройка Swagger (документация API)
  const config = new DocumentBuilder()
    .setTitle('Online Store API')
    .setDescription('API для онлайн-каталога бренда одежды')
    .setVersion('1.0')
    .addBearerAuth() // Добавляем поддержку JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Запуск сервера
  await app.listen(3000);
  console.log(`Сервер запущен на http://localhost:3000`);
}
bootstrap();
