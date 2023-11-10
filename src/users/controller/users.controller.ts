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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserRequest } from '../requests/create-user.request';
import { UsersService } from '../providers/users.service';
import { query } from 'express';
import { SearchUserRequest } from '../requests/search-user.request';
import { UpdateUserRequest } from '../requests/update-user.request';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  index(@Query() searchRequest: SearchUserRequest) {
    return this.userService.search(
      searchRequest.keyword,
      searchRequest.page,
      searchRequest.limit,
    );
  }

  @Post()
  @HttpCode(201)
  create(@Body() requesBody: CreateUserRequest) {
    return {
      requesBody: requesBody,
    };
  }

  @Get('/:id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.userService.find(id);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() requesrBody: UpdateUserRequest,
  ) {
    return this.userService.update(id, requesrBody);
  }

  @Delete('/:id')
  destroy(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
