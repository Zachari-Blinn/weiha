import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => Order, order => order.orderDetails)
  public order!: Order;

  @ManyToOne(() => Product, product => product.orderDetails)
  public product!: Product;

  @Column({ nullable: false, default: 0 })
  public quantity: number;

  @Column({ nullable: false, type: 'money', default: 0 })
  public price: number;
}
