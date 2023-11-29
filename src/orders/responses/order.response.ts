import { Order } from '../entities/order.entity';

export class OrderResponse {
  order_id: number;

  serialNumber: number;

  userId: number;

  orderAt: Date;

  totalPrice: number;

  status: number;

  note?: string;

  constructor(order: Order) {
    this.order_id = order.order_id;
    this.serialNumber = order.serialNumber;
    this.userId = order.userId;
    this.orderAt = order.orderAt;
    this.totalPrice = order.totalPrice;
    this.status = order.status;
    this.note = order.note;
  }
}
