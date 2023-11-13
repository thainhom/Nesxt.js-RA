import { Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { UsersController } from './controller/users.controller';
import { UserPassword } from './entities/user-password.entity';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProfile, UserPassword, Role])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
