import { Module } from '@nestjs/common';
import { ContactController } from './controller/contact.controller';
import { ContactService } from './provider/contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
