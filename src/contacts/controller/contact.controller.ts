import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { ContactService } from '../provider/contact.service';
import { SearchContactRequest } from '../requests/search-contact.request';
import { CreateContactRequest } from '../requests/create-contact.request';
import { UpdateContactRequest } from '../requests/update-contact.request';

@Controller('contacts')
export class ContactController {
  constructor(private contactsService: ContactService) {}

  @Get()
  async index(@Query() searchRequest: SearchContactRequest) {
    return await this.contactsService.search(searchRequest);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() requestBody: CreateContactRequest, @Request() request) {
    await this.contactsService.create(requestBody, request['user'].sub);
  }

  @Get('/:id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.contactsService.find(id);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() requestBody: UpdateContactRequest,
  ) {
    return await this.contactsService.update(id, requestBody);
  }

  @Delete('/:id')
  @HttpCode(204)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    await this.contactsService.delete(id);
  }
}
