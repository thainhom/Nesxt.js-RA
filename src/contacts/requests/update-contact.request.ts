import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UpdateContactRequest {
  @IsNotEmpty()
  @MaxLength(30)
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @MaxLength(50)
  content?: string;

  @IsNotEmpty()
  status: number;
}
