import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginAuthDto,
  RefreshTokenDto,
  RegisterAuthDto,
} from './dto/create-auth.dto';
import { CurrentUser } from './decorators/user.decorator';
import { Auth } from './decorators/auth.decorator';
import type { Request, Response } from 'express';
import {
  clearRefreshCookie,
  readRefreshCookie,
  setRefreshCookie,
} from './refresh-cookie';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Регистрация для Userа
  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async register(
    @Body() registerAuthDto: RegisterAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.register(registerAuthDto);
    setRefreshCookie(response, result.refreshToken);

    return { user: result.user, accessToken: result.accessToken };
  }

  // Логин для Userа
  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(loginAuthDto);
    setRefreshCookie(response, result.refreshToken);

    return { user: result.user, accessToken: result.accessToken };
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.getNewTokens(
      readRefreshCookie(request),
    );
    setRefreshCookie(response, result.refreshToken);

    return { user: result.user, accessToken: result.accessToken };
  }

  @Post('logout')
  @HttpCode(204)
  logout(@Res({ passthrough: true }) response: Response) {
    clearRefreshCookie(response);
  }

  // Обновление токенов
  @Post('login/access-token')
  @HttpCode(200)
  async getNewTokens(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.getNewTokens(
      readRefreshCookie(request) || refreshTokenDto?.refreshToken,
    );
    setRefreshCookie(response, result.refreshToken);

    return { user: result.user, accessToken: result.accessToken };
  }

  // Получение своего профиля
  @Get('me')
  @Auth()
  @HttpCode(200)
  getProfile(@CurrentUser('id') userId: number) {
    return this.authService.getProfile(userId);
  }
}
