import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDto) {
    return NotImplementedException;
  }

  findAll() {
    return NotImplementedException;
  }

  findOne(id: string) {
    return NotImplementedException;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return NotImplementedException;
  }

  remove(id: string) {
    return NotImplementedException;
  }
}
