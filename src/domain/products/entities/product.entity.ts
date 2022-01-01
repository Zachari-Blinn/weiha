import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderDetail } from '../../order-details/entities/order-detail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;

  @Column({ nullable: false })
  public name!: string;

  @Column({ nullable: true, type: 'text' })
  public description?: string;

  @Column({ nullable: false, type: 'money', default: 0 })
  public price!: number;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.product)
  public orderDetails!: OrderDetail[];
}
