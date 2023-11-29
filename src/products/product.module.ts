import { Module } from '@nestjs/common';
import { ProductsController } from '../products/controller/product.controller';
import { ProductsService } from './providers/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductModule {}
