import { forwardRef, Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { OrdersService } from '../orders/orders.service';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/products.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
  ) {}

  public async addProductToOrder(orderId: string, productId: string) {
    //check if order exists
    const order = await this.ordersService.findOne(orderId);
    if (!order) {
      throw new NotImplementedException(`Order with id ${orderId} does not exist`);
    }
    //check if product exists
    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new NotImplementedException(`Product with id ${productId} does not exist`);
    }
    //check if product is already in order
    const orderDetail = await this.orderDetailRepository.findOne({
      where: { orderId, productId },
    });
    //add product to order if orderDetail exists
    if (orderDetail) {
      orderDetail.quantity++;
    }
    // if orderDetail does not exist, create new orderDetail
    const newOrderDetail = new OrderDetail();
    newOrderDetail.order = orderId;
    newOrderDetail.product = productId;
    newOrderDetail.quantity = 1;
    return this.orderDetailRepository.save(newOrderDetail);
  }

  public async removeProductFromOrder(orderId: string, productId: string) {
    return NotImplementedException;
  }
}
