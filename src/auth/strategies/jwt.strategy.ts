import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_secret_key', // Замените на настоящий секретный ключ
    });
  }

  async validate(payload: JwtPayload) {
    //return this.usersService.findOne(payload.sub);
    const user = await this.usersService.findOne(payload.sub); // Используем findOne
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    return user;
  }
}