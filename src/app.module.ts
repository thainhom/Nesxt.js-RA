import { ContactModule } from './contacts/contact.module';
import { ContactService } from './contacts/provider/contact.service';
import { ContactController } from './contacts/controller/contact.controller';
import { OrderModule } from './orders/order.module';
import { ProductModule } from './products/product.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
        ContactModule, 
    OrderModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'ra_module05',
      entities: [`${__dirname}/**/*.entity.ts`],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [ContactController, AppController],
  providers: [
        ContactService, AppService],
})
export class AppModule {}
