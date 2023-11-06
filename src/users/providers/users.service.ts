import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserRequest } from '../requests/create-user.request';
@Injectable()
export class UsersService {
  private static users: Array<User> = [];
  search(keyword: string, page?: number, limit?: number): User[] {
    return UsersService.users.filter(
      (user, index) => !keyword || user.email.includes(keyword),
    );
  }
  create(createUser: CreateUserRequest) {
    const user: User = new User();
    user.id = UsersService.users.length + 1;
    user.username = createUser.username;
    user.email = createUser.email;
    user.password = createUser.password;
    user.firstName = createUser.username;
    user.lastName = createUser.username;
    UsersService.users.push(user);
  }
  find(id: number) {
    const user: User = UsersService.users.find((value) => value.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
