import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_profile')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'gender', type: 'int' })
  gender: number;

  @Column({ name: 'phone_number', type: 'varchar', length: 13 })
  phoneNumber: string;

  @Column({ name: 'address', type: 'varchar', length: 320 })
  address: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
