import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './providers/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
