import { Controller, Get, UseGuards, Post, Body, Delete, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';


@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  @Get('users')
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Post('products')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.delete(+id);
  }

  // Другие администраторские методы...
}