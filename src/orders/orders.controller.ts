import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import { OrdersService } from './orders.service';
  import { CreateOrderDto } from './dto/create-order.dto';
  import { UpdateOrderDto } from './dto/update-order.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt.guard';
  
  @Controller('orders')
  export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createOrderDto: CreateOrderDto) {
      return this.ordersService.create(createOrderDto);
    }
  
    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
      return this.ordersService.findAll();
    }
  
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: number) {
      return this.ordersService.findOne(id);
    }
  
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(
      @Param('id') id: number,
      @Body() updateOrderDto: UpdateOrderDto,
    ) {
      return this.ordersService.update(id, updateOrderDto);
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: number) {
      return this.ordersService.remove(id);
    }
  }