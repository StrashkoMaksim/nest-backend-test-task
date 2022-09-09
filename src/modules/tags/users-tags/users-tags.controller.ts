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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../JWT/jwt-auth-guard';
import { User } from '../../users/entities/user.entity';
import { TagsInfoResponse } from '../dto/tags-info-response';
import { GetTagsDto } from '../dto/get-tags-dto';
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

  @Get()
  @ApiOperation({
    summary: 'Получение информации о тегах, которые создал пользователь',
  })
  @ApiCreatedResponse({
    type: TagsInfoResponse,
    description: 'Информация о тегах получена',
  })
  @ApiBearerAuth()
  getMy(@Query() dto: GetTagsDto) {
    return this.usersTagsService.getMy();
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
