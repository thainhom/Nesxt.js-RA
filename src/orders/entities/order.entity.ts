import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({ type: 'varchar', length: 20 })
  serial_number: string;

  @Column()
  user_id: number;

  @CreateDateColumn({ type: 'datetime' })
  order_at: Date;

  @Column()
  total_price: number;

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
}
