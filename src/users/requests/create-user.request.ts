import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  username: string;
  @IsEmail()
  email: string;

  @IsOptional()
  @MaxLength(10)
  firstName: string;

  @IsOptional()
  @MaxLength(10)
  lastName: string;
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
