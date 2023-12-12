import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderDetails } from './order-detail.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({ name: 'serial_number', type: 'varchar', length: 20 })
  serialNumber: number;

  @Column({ name: 'user_id' })
  userId: number;

  @CreateDateColumn({ name: 'order_at', type: 'datetime' })
  orderAt: Date;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @Column()
  status: number;

  @Column({ type: 'varchar', length: 500 })
  note: string;
  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  created_at: Date;

  @Column()
  created_by_id: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updated_at: Date;

  @Column()
  updated_by_id: number;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt?: Date;

  @OneToMany(
    () => OrderDetails,
    (orderDetails: OrderDetails) => orderDetails.order,
  )
  orderDetails: OrderDetails[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
