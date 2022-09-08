import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../JWT/jwt-auth-guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TokenResponse } from './dto/token-response';
import { Request } from 'express';
import { User } from './entities/user.entity';
import { UpdateUserResponse } from './dto/update-user-response';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signin')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiCreatedResponse({
    description: 'Пользователь успешно зарегистрирован',
    type: TokenResponse,
  })
  @ApiBody({ type: SignInUserDto })
  signIn(@Body() dto: SignInUserDto) {
    return this.usersService.signIn(dto);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiOkResponse({
    description: 'Пользователь успешно авторизован',
    type: TokenResponse,
  })
  @ApiBody({ type: LoginUserDto })
  login(@Body() dto: LoginUserDto) {
    return this.usersService.login(dto);
  }

  @Get('/check-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Обновление токена' })
  @ApiOkResponse({
    description: 'Пользователь успешно обновил токен',
    type: TokenResponse,
  })
  @ApiBearerAuth()
  checkAuth(@Req() req: Request & { user: User }) {
    return this.usersService.generateToken(req.user);
  }

  @Post('/logout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Выход пользователя из системы' })
  @ApiOkResponse({ description: 'Пользователь успешно вышел' })
  @ApiBearerAuth()
  logout() {
    // Не уверен, насколько необходим этот endpoint. При авторизации с помощью
    // JWT сервер не знает, авторизован пользователь или нет. Достаточно
    // удалить токен на клиенте.
    return true;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getSelfWithTags(@Req() req: Request & { user: User }) {
    return this.usersService.getSelfWithTags(req.user.uid);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменение информации о пользователе' })
  @ApiOkResponse({
    description: 'Пользователь успешно изменил информацию',
    type: UpdateUserResponse,
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  update(
    @Req() req: Request & { user: User },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req.user.uid, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiOkResponse({ description: 'Пользователь успешно удален' })
  @ApiBearerAuth()
  remove(@Req() req: Request & { user: User }) {
    return this.usersService.remove(req.user.uid);
  }
}
