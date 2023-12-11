import { Module } from '@nestjs/common';
import { OrdersController } from '../orders/controller/order.controller';
import { OrdersService } from './providers/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetails } from '../orders/entities/order-detail.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetails, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrderModule {}
