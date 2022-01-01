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
import { OrderDetail } from '../../order-details/entities/order-detail.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @Column({ nullable: false, type: 'money', default: 0 })
  public amount: number;

  @Column({ nullable: false, enum: ['eur'], default: 'eur' })
  public currency: string;

  @Column({ nullable: false, default: false })
  public isPaid: boolean;

  @ManyToOne(() => User, user => user.orders)
  public user: User;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  public orderDetails!: OrderDetail[];
}
