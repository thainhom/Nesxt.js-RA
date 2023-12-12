import { OrderDetails } from '../entities/order-detail.entity';

export class OrderDetailResponse {
  order_detail_id: number;

  order_id: number;

  productId: number;

  sku: string;

  name: string;

  unitPrice: number;

  quantity: number;

  subTotalPrice: number;

  constructor(orderDetails: OrderDetails) {
    this.order_detail_id = orderDetails.order_detail_id;
    this.order_id = orderDetails.order_id;

    this.productId = orderDetails.productId;

    this.sku = orderDetails.sku;

    this.name = orderDetails.name;

    this.unitPrice = orderDetails.unitPrice;

    this.quantity = orderDetails.quantity;

    this.subTotalPrice = orderDetails.subTotalPrice;
  }
}
