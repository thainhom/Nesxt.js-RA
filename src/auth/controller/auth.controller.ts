import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from '../provider/auth.service';
import { LoginRequest } from '../resquets/login.resquest';
import { LoginResponse } from '../responses/login.response';
import { Public } from '../decorators/auth.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() requestBody: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(requestBody);
  }
  @Get('auth')
  async getAuth(@Req() req) {
    return await this.authService.getAuth(req.user.id);
  }
  @Public()
  @Post('register')
  async register(
    @Body()
    requestBody,
  ): Promise<any> {
    try {
      const result = await this.authService.register(requestBody);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
