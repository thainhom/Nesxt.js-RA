import { Module } from '@nestjs/common';
import { OrdersController } from '../orders/controller/order.controller';
import { OrdersService } from './providers/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetails } from '../orders/entities/order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetails])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrderModule {}
