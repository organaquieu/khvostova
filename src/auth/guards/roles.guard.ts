import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Если роли не указаны, доступ разрешён
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false; // Токен отсутствует
    }

    const payload = this.jwtService.verify(token);
    const user = await this.usersService.findOne(payload.sub);

    if (!user) {
      return false; // Пользователь не найден
    }

    return roles.includes(user.role); // Проверяем, есть ли роль у пользователя
  }
}