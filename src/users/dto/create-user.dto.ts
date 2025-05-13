import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/entities/user.entity'

export class CreateUserDto {
  @ApiProperty({ default: 'name1' })
  username: string;

  @ApiProperty({ default: '123' })
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstName?: string;


  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPhoneNumber('RU')
  phone?: string;

  //тут добавили 
  @ApiProperty({ enum: UserRole, default: UserRole.USER, required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

// import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

// export class CreateUserDto {
//   @IsEmail()
//   email: string;

//   @IsString()
//   @MinLength(6)
//   @MaxLength(20)
//   password: string;

//   @IsString()
//   firstName: string;

//   @IsString()
//   lastName: string;

//   @IsString()
//   phone: string;
// }