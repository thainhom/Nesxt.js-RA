import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { OrdersService } from '../providers/order.service';
import { SearchOrderRequest } from '../requests/search-order.request';
import { CreateOrderRequest } from '../requests/create-order.request';
import { UpdateOrderRequest } from '../requests/update-order.request';
import { OrderDetails } from '../entities/order-detail.entity';
import { Order } from '../entities/order.entity';

@Controller()
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('orders')
  async index(@Query() searchRequest: SearchOrderRequest) {
    return await this.ordersService.search(searchRequest);
  }

  @Post('orders')
  @HttpCode(201)
  async create(@Body() requestBody: CreateOrderRequest, @Request() request) {
    await this.ordersService.create(requestBody, request['user'].sub);
  }

  @Get('orders/:id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.ordersService.find(id);
  }

  @Put('orders/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() requestBody: UpdateOrderRequest,
  ) {
    return await this.ordersService.update(id, requestBody);
  }

  @Delete('orders/:id')
  @HttpCode(204)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    await this.ordersService.delete(id);
  }

  @Delete('order-details/:id')
  async deleteOrderDetail(@Param('id') orderDetailId: number): Promise<void> {
    console.log('id', orderDetailId);

    await this.ordersService.deleteOrderDetail(orderDetailId);
  }

  @Get('orders/:orderId/details')
  async getOrderDetailsByOrderId(
    @Param('orderId') orderId: number,
  ): Promise<OrderDetails[]> {
    return this.ordersService.getOrderDetailsByOrderId(orderId);
  }

  @Get('orders/:orderId')
  async getDetailOrder(
    @Param('orderId') orderId: number,
  ): Promise<Order | undefined> {
    return this.ordersService.getDetailOrder(orderId);
  }
}
