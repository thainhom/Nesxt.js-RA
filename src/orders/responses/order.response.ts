import { Order } from '../entities/order.entity';
import { OrderDetailResponse } from './orderdetail.response';

export class OrderResponse {
  order_id: number;

  serial_number: number;

  user_id: number;

  order_at: Date;

  total_price: number;

  status: number;

  note?: string;

  order_details: OrderDetailResponse[];

  username: string;

  constructor(order: Order) {
    this.order_id = order.order_id;
    this.serial_number = order.serialNumber;
    this.user_id = order.userId;
    this.order_at = order.orderAt;
    this.total_price = order.totalPrice;
    this.status = order.status;
    this.note = order.note;
    this.username = order.user.username;
    this.order_details = order.orderDetails.map(
      (orderDetail) => new OrderDetailResponse(orderDetail),
    );
  }
}
