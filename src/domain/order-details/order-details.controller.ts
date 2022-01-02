import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Controller()
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post('users/:userId/products/:productId')
  addProductToUserCart(@Param('userId') userId: string, @Param('productId') productId: string) {
    console.log(userId, productId);
    return this.orderDetailsService.addProductToUserCart(userId, productId);
  }

  @Delete('orders/:orderId/products/:productId')
  removeProductFromOrder(@Param('orderId') orderId: string, @Param('productId') productId: string) {
    return this.orderDetailsService.removeProductFromOrder(orderId, productId);
  }
}
