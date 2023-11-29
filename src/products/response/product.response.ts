import { Product } from '../entities/product.entity';

export class ProductResponse {
  product_id: number;

  name: string;

  sku: string;

  category: string;

  description?: string;

  unit_price: number;

  image?: string;

  created_at: Date;

  created_by_id: number;

  updated_at: Date;

  updated_by_id: number;

  constructor(product: Product) {
    this.product_id = product.product_id;
    this.name = product.name;
    this.sku = product.sku;
    this.category = product.category;
    this.description = product?.description;
    this.unit_price = product.unit_price;
    this.image = product?.image;
    this.created_at = product.created_at;
    this.created_by_id = product.created_by_id;
    this.updated_at = product.updated_at;
    this.updated_by_id = product.updated_by_id;
  }
}
