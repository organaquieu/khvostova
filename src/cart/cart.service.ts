import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { UserEntity } from '../users/entities/user.entity';
import { Product } from '../products/product.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findActiveCart(userId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId }, isActive: true },
      relations: ['items', 'items.product'],
    });
  
    if (!cart) {
      throw new NotFoundException('Active cart not found');
    }
  
    return cart;
  }

  async createCart(user: UserEntity): Promise<Cart> {
    const cart = this.cartRepository.create({ user });
    return this.cartRepository.save(cart);
  }

  async addToCart(userId: number, addToCartDto: AddToCartDto): Promise<Cart> {
    let cart = await this.findActiveCart(userId);
    
    if (!cart) {
      const user = new UserEntity();
      user.id = userId;
      cart = await this.createCart(user);
    }

    const product = await this.productRepository.findOneBy({ id: addToCartDto.productId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existingItem = cart.items.find(item => item.product.id === addToCartDto.productId);
    
    if (existingItem) {
      existingItem.quantity += addToCartDto.quantity;
      if (addToCartDto.customSize) {
        existingItem.customSize = addToCartDto.customSize;
      }
      await this.cartItemRepository.save(existingItem);
    } else {
      const newItem = this.cartItemRepository.create({
        cart,
        product,
        quantity: addToCartDto.quantity,
        customSize: addToCartDto.customSize,
      });
      await this.cartItemRepository.save(newItem);
    }

    return this.findActiveCart(userId);
  }

  async updateCartItem(userId: number, itemId: number, updateDto: UpdateCartItemDto): Promise<Cart> {
    const cart = await this.findActiveCart(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const item = cart.items.find(i => i.id === itemId);
    if (!item) {
      throw new NotFoundException('Item not found in cart');
    }

    if (updateDto.quantity !== undefined) {
      item.quantity = updateDto.quantity;
    }
    if (updateDto.customSize !== undefined) {
      item.customSize = updateDto.customSize;
    }

    await this.cartItemRepository.save(item);
    return this.findActiveCart(userId);
  }

  async removeCartItem(userId: number, itemId: number): Promise<Cart> {
    const cart = await this.findActiveCart(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const item = cart.items.find(i => i.id === itemId);
    if (!item) {
      throw new NotFoundException('Item not found in cart');
    }

    await this.cartItemRepository.remove(item);
    return this.findActiveCart(userId);
  }

  async clearCart(userId: number): Promise<void> {
    const cart = await this.findActiveCart(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.cartItemRepository.delete({ cart: { id: cart.id } });
  }
}