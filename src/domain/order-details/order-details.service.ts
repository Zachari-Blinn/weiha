import { Inject, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from '../orders/constants/order-status.enum';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  public async addProductToUserCart(userId: string, productId: string) {
    // check if user exist
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} does not exist`);
    }

    // check if product exist
    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} does not exist`);
    }

    // check if a new order is needed
    const order = await this.ordersService.findOneByCriteria({
      user: userId,
      status: OrderStatus.PENDING,
    });

    if (!order) {
      this.ordersService.create({
        status: OrderStatus.PENDING,
        user,
      });
    }

    // check if product is already in user cart with order status pending
    const orderDetail = await this.orderDetailRepository.findOne({
      relations: ['order'],
      where: {
        product: productId,
        order: { status: OrderStatus.PENDING, user: userId },
      },
    });

    let result;

    if (orderDetail) {
      orderDetail.quantity++;
      result = await this.orderDetailRepository.save(orderDetail);
    } else {
      const newOrderDetail = new OrderDetail();
      newOrderDetail.order = order;
      newOrderDetail.product = product;
      newOrderDetail.price = product.price;
      newOrderDetail.quantity = 1;
      result = await this.orderDetailRepository.save(newOrderDetail);
    }

    await this.ordersService.calculateOrderTotal(order.id);
    
    return result;
  }

  public async removeProductFromOrder(orderId: string, productId: string) {
    return NotImplementedException;
  }
}
