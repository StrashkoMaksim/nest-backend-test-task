import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../JWT/jwt-auth-guard';
import { User } from '../../users/entities/user.entity';
import { UsersTagsService } from './users-tags.service';
import { AddTagsDto } from './dto/add-tags-dto';
import { UserTagsResponse } from './dto/user-tags-response';

@ApiTags('user/tag')
@Controller('user/tag')
export class UsersTagsController {
  constructor(private readonly usersTagsService: UsersTagsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Добавление тегов пользователю' })
  @ApiCreatedResponse({
    type: UserTagsResponse,
    description: 'Тег успешно создан',
  })
  @ApiBearerAuth()
  @ApiBody({ type: AddTagsDto })
  add(@Req() req: Request & { user: User }, @Body() dto: AddTagsDto) {
    return this.usersTagsService.add(req.user.uid, dto);
  }

  @Get('/my')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Получение информации о тегах, которые создал пользователь',
  })
  @ApiCreatedResponse({
    type: UserTagsResponse,
    description: 'Информация о тегах получена',
  })
  @ApiBearerAuth()
  getMy(@Req() req: Request & { user: User }) {
    return this.usersTagsService.getMy(req.user.uid);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Удаление тега из списка прикрепленных к пользователю',
  })
  @ApiCreatedResponse({
    type: UserTagsResponse,
    description: 'Тег успешно удален',
  })
  @ApiBearerAuth()
  remove(@Param('id') id: number, @Req() req: Request & { user: User }) {
    return this.usersTagsService.remove(id, req.user.uid);
  }
}
