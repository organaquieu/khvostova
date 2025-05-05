import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule), // Используем forwardRef для избежания циклической зависимости
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key', // Замените на настоящий секретный ключ
      signOptions: { expiresIn: '1000h' }, // Время жизни токена
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule], // Экспортируем JwtModule
})
export class AuthModule {}