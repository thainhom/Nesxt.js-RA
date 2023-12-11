import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateContactRequest {
  @PrimaryGeneratedColumn()
  contact_id: number;

  full_name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  content?: string;

  status?: number;
}
