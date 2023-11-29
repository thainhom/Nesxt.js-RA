import { IsNotEmpty, IsStrongPassword, Length } from 'class-validator';
import { UserRole } from '../../users/enums/user-role.enums';

export class LoginRequest {
  @IsNotEmpty()
  @Length(4, 10)
  username: string;

  @IsNotEmpty()
  @Length(8, 20)
  @IsStrongPassword()
  password: string;

  // @IsOptional()
  role?: UserRole = UserRole.CUSTOMER;
}
