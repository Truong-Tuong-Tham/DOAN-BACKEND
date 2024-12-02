import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { loginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: loginDto,
    @Res() res: Response,
  ): Promise<Response<string>> {
    try {
      const result = await this.authService.login(body);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error logging in',
      });
    }
  }

  @Post('register')
  async register(
    @Body() body: RegisterDto,
    @Res() res: Response,
  ): Promise<Response<string>> {
    try {
      const result = await this.authService.register(body);
      return res.status(HttpStatus.CREATED).json({
        message: 'User registered successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
