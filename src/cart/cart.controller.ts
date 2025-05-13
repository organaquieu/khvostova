import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from '../decorators/user-id.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@UserId() userId: number) {
    return this.cartService.findActiveCart(userId);
  }

  @Post('add')
  async addToCart(@UserId() userId: number, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(userId, addToCartDto);
  }

  @Patch('items/:itemId')
  async updateCartItem(
    @UserId() userId: number,
    @Param('itemId') itemId: number,
    @Body() updateDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(userId, itemId, updateDto);
  }

  @Delete('items/:itemId')
  async removeCartItem(@UserId() userId: number, @Param('itemId') itemId: number) {
    return this.cartService.removeCartItem(userId, itemId);
  }

  @Delete('clear')
  async clearCart(@UserId() userId: number) {
    return this.cartService.clearCart(userId);
  }
}