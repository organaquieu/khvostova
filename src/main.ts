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

  // Запуск сервера на всех интерфейсах (0.0.0.0)
  const port = 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Сервер запущен на http://localhost:${port}`);
  console.log(`Сервер также доступен по ZeroTier IP: http://192.168.195.168:${port}`);
  console.log(`Swagger UI доступен по адресу: http://192.168.195.168:${port}/api`);
}
bootstrap();
