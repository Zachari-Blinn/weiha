import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {}

  create(createOrderDto: CreateOrderDto) {
    return NotImplementedException;
  }

  findAll() {
    return NotImplementedException;
  }

  findOne(id: string): Promise<Order> {
    return null;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return NotImplementedException;
  }

  remove(id: string) {
    return NotImplementedException;
  }
}
