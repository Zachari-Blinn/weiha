import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Currency } from '../../constants/currency.enum';
import { OrderDetail } from '../../order-details/entities/order-detail.entity';
import { User } from '../../users/user.entity';
import { OrderStatus } from '../constants/order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @Column({ nullable: false, type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  public status: OrderStatus;

  @Column({ nullable: false, type: 'money', default: 0 })
  public amount: number;

  @Column({ nullable: false, enum: Currency, default: Currency.EUR })
  public currency: Currency;

  @Column({ nullable: false, default: false })
  public isPaid: boolean;

  @ManyToOne(() => User, user => user.orders)
  public user: User;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  public orderDetails: OrderDetail[];
}
