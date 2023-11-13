import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRequest } from '../requests/create-user.request';
import { User } from '../entities/user.entity';
import { UpdateUserRequest } from '../requests/update-user.request';
import { UserResponse } from '../responses/user.response';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Tài liệu: https://docs.nestjs.com/providers#services
@Injectable()
export class UsersService {
  private static users: Array<User> = [];

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async search(
    keyword?: string,
    page?: number,
    limit?: number,
  ): Promise<[User[], number]> {
    return await this.userRepository.findAndCount({
      where: {
        username: ILike(`%${keyword || ''}%`),
      },
      order: { id: 'DESC' }, // ORDER BY
      take: 5, // Tương đương LIMIT
      skip: 0, // Tương đương OFFSET
    });
  }

  async create(createUser: CreateUserRequest): Promise<void> {
    const user: User = new User();
    user.username = createUser.username;
    user.email = createUser.email;
    user.firstName = createUser.firstName;
    user.lastName = createUser.lastName;
    user.password = createUser.password; // TODO: mã hóa

    await this.userRepository.save(user);
  }

  async find(id: number): Promise<UserResponse> {
    const user: User = await this.userRepository.findOneBy({ id });

    // Kiểm tra người dùng có tồn tại hay không ?
    if (!user) {
      throw new NotFoundException();
    }

    return new UserResponse(user);
  }

  async update(
    id: number,
    updateUser: UpdateUserRequest,
  ): Promise<UserResponse> {
    const user: User = await this.userRepository.findOneBy({ id });

    // Kiểm tra người dùng có tồn tại hay không ?
    if (!user) {
      throw new NotFoundException();
    }

    await this.userRepository.update({ id: id }, updateUser);

    return await this.find(id);
  }

  async delete(id: number): Promise<void> {
    const user: User = await this.userRepository.findOneBy({ id });

    // Kiểm tra người dùng có tồn tại hay không ?
    if (!user) {
      throw new NotFoundException();
    }

    this.userRepository.softRemove({ id });
  }
}
