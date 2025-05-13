import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private prisma = new PrismaClient();

  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    this.logger.debug(`Creating user with data: ${JSON.stringify(dto)}`);
    
    const existingUser = await this.findByUsername(dto.username);
    this.logger.debug(`Existing user check result: ${existingUser ? 'found' : 'not found'}`);

    if (existingUser) {
      throw new BadRequestException(
        `Пользователь ${dto.username} уже существует`,
      );
    }

    try {
      const user = await this.repository.save(dto);
      this.logger.debug(`User created successfully: ${JSON.stringify(user)}`);
      return user;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findByUsername(username: string) {
    return this.repository.findOneBy({ username });
  }

  async repositorySave(dto: CreateUserDto) {
    // Implementation of repositorySave method
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }
} 

// import { Injectable, BadRequestException, Logger } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { UpdateMeasurementsDto } from './dto/update-measurements.dto';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UserEntity } from './entities/user.entity';

// @Injectable()
// export class UsersService {
//   private readonly logger = new Logger(UsersService.name);

//   constructor(
//     @InjectRepository(UserEntity)
//     private repository: Repository<UserEntity>,
//   ) {}

//   async create(dto: CreateUserDto) {
//     this.logger.debug(`Creating user with data: ${JSON.stringify(dto)}`);
    
//     const existingUser = await this.findByUsername(dto.username);
//     this.logger.debug(`Existing user check result: ${existingUser ? 'found' : 'not found'}`);

//     if (existingUser) {
//       throw new BadRequestException(
//         `Пользователь ${dto.username} уже существует`,
//       );
//     }

//     try {
//       const user = await this.repository.save(dto);
//       this.logger.debug(`User created successfully: ${JSON.stringify(user)}`);
//       return user;
//     } catch (error) {
//       this.logger.error(`Error creating user: ${error.message}`, error.stack);
//       throw error;
//     }
//   }

//   async findByUsername(username: string) {
//     return this.repository.findOneBy({ username });
//   }

//   async findById(id: number) {
//     return this.repository.findOneBy({ id });
//   }

//   async updateMeasurements(id: number, dto: UpdateMeasurementsDto) {
//     const user = await this.repository.findOneBy({ id });
//     if (!user) {
//       throw new BadRequestException(`Пользователь с id=${id} не найден`);
//     }

//     if (dto.shoulders !== undefined) user.shoulders = dto.shoulders;
//     if (dto.chest !== undefined) user.chest = dto.chest;
//     if (dto.waist !== undefined) user.waist = dto.waist;
//     if (dto.hips !== undefined) user.hips = dto.hips;
//     if (dto.wrist !== undefined) user.wrist = dto.wrist;
//     if (dto.neck !== undefined) user.neck = dto.neck;

//     return this.repository.save(user);
//   }

//     async findAll(): Promise<UserEntity[]> {
//     return this.repository.find();
//   }

//   async getMeasurements(id: number) {
//     const user = await this.repository.findOne({
//       where: { id },
//       select: ['shoulders', 'chest', 'waist', 'hips', 'wrist', 'neck'],
//     });
//     if (!user) {
//       throw new BadRequestException(`Пользователь с id=${id} не найден`);
//     }
//     return user;
//   }
// }


// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}
 
//   async create(user: Partial<User>): Promise<User> {
//     const newUser = this.usersRepository.create(user); // Используем create
//     return this.usersRepository.save(newUser);
//   //async create(user: User): Promise<User> {
//     //return this.usersRepository.save(user);
//   }



//   // Найти пользователя по ID
//   async findOne(id: number): Promise<User | null> {
//     return this.usersRepository.findOne({ where: { id } });
//   }

//   // Найти пользователя по email
//   async findOneByEmail(email: string): Promise<User | null> {
//     return this.usersRepository.findOne({ where: { email } });
//   }

//   async findOneOrFail(id: number): Promise<User> {
//     const user = await this.usersRepository.findOne({ where: { id } });
//     if (!user) {
//       throw new NotFoundException('Пользователь не найден');
//     }
//     return user;
//   }

//   async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
//     const user = await this.usersRepository.findOne({ where: { id } });
//     if (!user) {
//       throw new Error('Пользователь не найден');
//     }
  
//     Object.assign(user, updateUserDto); // Обновляем поля
//     return this.usersRepository.save(user);
//   }
  
//   async remove(id: number): Promise<void> {
//     const user = await this.usersRepository.findOne({ where: { id } });
//     if (!user) {
//       throw new Error('Пользователь не найден');
//     }
//     await this.usersRepository.remove(user)
//   }
// }