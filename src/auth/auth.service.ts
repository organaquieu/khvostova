import {
  ForbiddenException,
  Injectable,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    this.logger.debug(`Attempting to register user: ${JSON.stringify(dto)}`);
    
    const isCreateUsers = this.configService.get('CREATE_USERS') === 'true';
    this.logger.debug(`CREATE_USERS setting: ${isCreateUsers}`);
    
    if (!isCreateUsers) {
      throw new BadRequestException('Запрещено создавать новых пользователей');
    }

    try {
      this.logger.debug('Creating user in database...');
      const userData = await this.usersService.create(dto);
      this.logger.debug(`User created successfully: ${JSON.stringify(userData)}`);

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      this.logger.error(`Error during registration: ${err.message}`, err.stack);
      throw new ForbiddenException(err.message);
    }
  }

  async login(user: UserEntity) {
    this.logger.debug(`User logged in: ${user.username}`);
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }

  async createAdminUser() {
    const adminData: CreateUserDto = {
      username: 'admin',
      password: 'secureAdminPassword123',
      role: UserRole.ADMIN,
    };
  
    const existingAdmin = await this.usersService.findByUsername(adminData.username);
    if (!existingAdmin) {
      return this.usersService.create(adminData);
    }
    return existingAdmin;
  }
}

// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../users/users.service';
// import * as bcrypt from 'bcrypt';
// import { RegisterDto } from './dto/register.dto';
// import { LoginDto } from './dto/login.dto';
// import { JwtPayload } from './interfaces/jwt-payload.interface';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}

//   async register(registerDto: RegisterDto) {
//     const hashedPassword = await bcrypt.hash(registerDto.password, 10);
//     const user = await this.usersService.create({
//       ...registerDto,
//       password: hashedPassword,
//     });
//     return user;
//   }

//   async validateUser(email: string, password: string): Promise<any> {
//     const user = await this.usersService.findOneByEmail(email);
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(loginDto: LoginDto) {
//     const user = await this.validateUser(loginDto.email, loginDto.password);
//     if (!user) {
//       throw new Error('Неверный email или пароль');
//     }
//     const payload: JwtPayload = { email: user.email, sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }