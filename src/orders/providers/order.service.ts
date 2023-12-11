import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderRequest } from '../requests/create-order.request';
import { Order } from '../entities/order.entity';
import { UpdateOrderRequest } from '../requests/update-order.request';
import { OrderResponse } from '../responses/order.response';
import { DataSource, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchOrderRequest } from '../requests/search-order.request';
import { Pagination } from 'src/utilities/Pagination';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { User } from 'src/users/entities/user.entity';
import moment from 'moment';
import { Product } from 'src/products/entities/product.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderDetails } from '../entities/order-detail.entity';
import { of } from 'rxjs';

// Tài liệu: https://docs.nestjs.com/providers#services
@Injectable()
export class OrdersService {
  private static orders: Array<Order> = [];

  constructor(
    private dataSource: DataSource,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async search(searchRequest: SearchOrderRequest): Promise<Pagination> {
    const result = await this.orderRepository.findAndCount({
      where: [
        {
          note: ILike(`%${searchRequest.keyword || ''}%`),
        },
      ],
      order: { order_id: 'DESC' }, // ORDER BY
      take: searchRequest.limit, // Tương đương LIMIT
      skip: searchRequest.getOffset(), // Tương đương OFFSET
    });

    return new Pagination(result[1], result[0]);
  }

  // async create(createOrder: CreateOrderRequest): Promise<void> {
  //   const queryRunner = this.dataSource.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     const order: Order = new Order();
  //     order.serialNumber = createOrder.serialNumber;
  //     order.userId = createOrder.userId;
  //     order.orderAt = createOrder.orderAt;
  //     order.totalPrice = createOrder.totalPrice;
  //     order.status = createOrder.status;
  //     order.note = createOrder.note;
  //     await queryRunner.manager.save(order);

  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     await queryRunner.rollbackTransaction();

  //     throw err;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  async create(
    createOrder: CreateOrderRequest,
    user_id: number,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    let totalPrice = 0;
    let orderDetails: OrderDetails[] = [];
    for (const item of createOrder.cart) {
      const product = await this.productRepository.findOneBy({
        product_id: item.product_id,
      });
      if (!product) {
        throw new NotFoundException();
      }
      const subTotalPrice = product.unit_price * item.quantity;
      totalPrice += subTotalPrice;

      const orderDetail = new OrderDetails();

      orderDetail.productId = product.product_id;
      orderDetail.sku = product.sku;
      orderDetail.name = product.name;
      orderDetail.unitPrice = product.unit_price;
      orderDetail.quantity = item.quantity;
      orderDetail.subTotalPrice = subTotalPrice;

      orderDetails.push(orderDetail);
    }

    try {
      const order = new Order();
      order.order_id = createOrder.order_id;
      order.serialNumber = new Date().getTime();
      order.userId = user_id;
      order.created_by_id = user_id;
      order.updated_by_id = user_id;
      order.orderAt = new Date();
      order.totalPrice = totalPrice;
      order.status = OrderStatus.NEW_ORDER;
      order.note = createOrder.note;
      await queryRunner.manager.save(order);
      for (const neworderDetail of orderDetails) {
        neworderDetail.order_id = order.order_id;
        await queryRunner.manager.save(neworderDetail);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);

      await queryRunner.rollbackTransaction();

      throw new HttpException(
        'Error creating order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async find(order_id: number): Promise<OrderResponse> {
    const order: Order = await this.orderRepository.findOneBy({ order_id });

    // Kiểm tra đơn hàng có tồn tại hay không ?
    if (!order) {
      throw new NotFoundException();
    }

    return new OrderResponse(order);
  }

  async update(
    order_id: number,
    orderUpdate: UpdateOrderRequest,
  ): Promise<OrderResponse> {
    const order: Order = await this.orderRepository.findOneBy({ order_id });

    // Kiểm tra đơn hàng có tồn tại hay không ?
    if (!order) {
      throw new NotFoundException();
    }

    await this.orderRepository.update({ order_id: order_id }, orderUpdate);

    return await this.find(order_id);
  }

  async delete(order_id: number): Promise<void> {
    const order: Order = await this.orderRepository.findOneBy({ order_id });

    // Kiểm tra đơn hàng có tồn tại hay không ?
    if (!order) {
      throw new NotFoundException();
    }

    this.orderRepository.softRemove({ order_id });
  }
}
