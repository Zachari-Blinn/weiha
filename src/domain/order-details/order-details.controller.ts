import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Controller()
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post('orders/:orderId/products/:productId')
  addProductToOrder(@Param('orderId') orderId: string, @Param('productId') productId: string) {
    return this.orderDetailsService.addProductToOrder(orderId, productId);
  }

  @Delete('orders/:orderId/products/:productId')
  removeProductFromOrder(@Param('orderId') orderId: string, @Param('productId') productId: string) {
    return this.orderDetailsService.removeProductFromOrder(orderId, productId);
  }
}
