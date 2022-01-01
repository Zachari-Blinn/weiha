import { Inject, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
  ) {}

  public async addProductToOrder(orderId: string, productId: string) {
    const order = await this.ordersService.findOne(orderId);
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} does not exist`);
    }

    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} does not exist`);
    }

    const orderDetail = await this.orderDetailRepository.findOne({
      where: { orderId, productId },
    });

    if (orderDetail) {
      orderDetail.quantity++;
      return this.orderDetailRepository.save(orderDetail);
    } else {
      const newOrderDetail = new OrderDetail();
      newOrderDetail.order = order;
      newOrderDetail.product = product;
      newOrderDetail.quantity = 1;
      return this.orderDetailRepository.save(newOrderDetail);
    }
  }

  public async removeProductFromOrder(orderId: string, productId: string) {
    return NotImplementedException;
  }
}
