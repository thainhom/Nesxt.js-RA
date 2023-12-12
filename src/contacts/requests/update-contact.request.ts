import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UpdateContactRequest {
  content?: string;

  status: number;
}
