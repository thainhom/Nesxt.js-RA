import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  contact_id: number;
  @Column({ name: 'full_name', type: 'varchar', length: 50 })
  fullname: string;
  @Column({ type: 'varchar', length: 50 })
  email: string;
  @Column({ type: 'varchar', length: 500 })
  content: string;
  @Column()
  status: number;
  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  created_at: Date;
  @Column()
  created_by_id: number;
  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updated_at: Date;
  @Column()
  updated_by_id: number;
}
