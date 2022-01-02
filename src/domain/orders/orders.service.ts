import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {}
  
  public async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderRepository.save(createOrderDto);
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
  
  public async findOneByCriteria(criteria: any): Promise<Order> {
    return this.orderRepository.findOne(criteria);
  }

  public async calculateOrderTotal(id: string) {
    // fuck this
    return null;
  }
}
