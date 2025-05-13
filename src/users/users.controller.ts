import { Controller, Post, Body, Get, UseGuards, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from '../decorators/user-id.decorator';
import { UpdateMeasurementsDto } from './dto/update-measurements.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ 
    status: 201, 
    description: 'Пользователь успешно зарегистрирован',
    type: CreateUserDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Пользователь с таким username уже существует' 
  })
  async register(@Body() dto: CreateUserDto) {
    try {
      const user = await this.usersService.create(dto);
      return {
        success: true,
        message: 'Пользователь успешно зарегистрирован',
        user
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }
} 

// import { Controller, Get, Post, Body, UseGuards, Patch } from '@nestjs/common';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// import { UsersService } from './users.service';
// import { JwtAuthGuard } from '../auth/guards/jwt.guard';
// import { UserId } from '../decorators/user-id.decorator';
// import { UpdateMeasurementsDto } from './dto/update-measurements.dto';
// import { CreateUserDto } from './dto/create-user.dto';


// @Controller('users')
// @ApiTags('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Get('me')
//   @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   getMe(@UserId() id: number) {
//     return this.usersService.findById(id);
//   }
  // @Patch('measurements')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // UpdateMeasurementsDto(
  //   @UserId() id: number,
  //   @Body() dto: UpdateMeasurementsDto,
  // ) {
  //   return this.usersService.updateMeasurements(id, dto);
  // }

//   @Get('measurements')
//   @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   getMeasurements(@UserId() id: number) {
//     return this.usersService.getMeasurements(id);
//   }

//   @Post('register')
//   async register(@Body() dto: CreateUserDto) {
//     return this.usersService.create(dto);
//   }
// }



// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Put,
//   Delete,
//   UseGuards,
// } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../auth/decorators/roles.decorator';

// @Controller('users')
// @UseGuards(RolesGuard)
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Post()
//   async create(@Body() createUserDto: CreateUserDto) {
//     return this.usersService.create(createUserDto);
//   }

//   @Get()
//   @UseGuards(JwtAuthGuard) // Проверка JWT-аутентификации
//   @Roles('manager') // Только менеджер может получить список пользователей
//   async findAll() {
//     return this.usersService.findAll();
//   }

//   @Get(':id')
//   @UseGuards(JwtAuthGuard)
//   async findOne(@Param('id') id: number) {
//     return this.usersService.findOne(id);
//   }

//   @Put(':id')
//   @UseGuards(JwtAuthGuard)
//   async update(
//     @Param('id') id: number,
//     @Body() updateUserDto: UpdateUserDto,
//   ) {
//     return this.usersService.update(id, updateUserDto);
//   }

//   @Delete(':id')
//   @UseGuards(JwtAuthGuard)
//   async remove(@Param('id') id: number) {
//     return this.usersService.remove(id);
//   }
// }