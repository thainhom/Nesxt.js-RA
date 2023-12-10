import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginResponse } from '../responses/login.response';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginRequest } from '../resquets/login.resquest';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from '../../users/responses/user.response';
import { UserRole } from 'src/users/enums/user-role.enums';
import { SALT_OR_ROUNDS } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findOneBy({
      username: loginRequest.username,
    });

    // Nếu không tìm thấy người dùng thì trả về lỗi
    if (!user) {
      throw new UnauthorizedException('Không thể xác thực.');
    }

    // Kiểm tra mật khẩu, nếu không trùng khớp thì trả về lỗi
    const isMatch = await bcrypt.compare(loginRequest.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Không thể xác thực.');
    }

    // Tạo ra token (sử dụng JWT)
    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    const loginResponse = new LoginResponse();
    loginResponse.token = token;

    // Trả về token cho client
    return loginResponse;
  }

  async getAuth(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findOneBy({ id });
    const userID = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException();
    }
    const authResponse = new UserResponse(user);
    // authResponse.profile = userID.profile.user_avatar;
    // authResponse.phone_number = userID.profile.phone_number;
    // authResponse.address = userID.profile.address;

    return authResponse;
  }
  async register(params): Promise<any> {
    const newUser = new User();
    newUser.username = params.username;
    newUser.email = params.email;
    newUser.password = await bcrypt.hash(params.password, SALT_OR_ROUNDS);
    newUser.role = UserRole.CUSTOMER;
    const user = await this.userRepository.save(newUser);

    return { message: 'User created successfully', user };
  }
}
