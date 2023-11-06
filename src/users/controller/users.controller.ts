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
} from '@nestjs/common';
import { CreateUserRequest } from '../requests/create-user.request';
import { UsersService } from '../providers/users.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  index(
    @Query('keyword') keyword: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.userService.search(keyword, page, limit);
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
    @Body() requesrBody: CreateUserRequest,
  ) {
    return {
      id: id,
      requesrBody: requesrBody,
    };
  }
  @Delete('/:id')
  destroy(@Param('id', ParseIntPipe) id: number) {
    return {
      id: id,
    };
  }
}
