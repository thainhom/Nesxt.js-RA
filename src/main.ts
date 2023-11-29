import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Để cho phép FA gọi được
  // Link tài liệu: https://docs.nestjs.com/pipes#class-validator
  // Cài đặt thư viện: npm i --save class-validator class-transformer

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(8080);
}
bootstrap();
