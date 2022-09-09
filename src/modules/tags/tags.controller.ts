import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTagResponse } from './dto/create-tag-response';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../JWT/jwt-auth-guard';
import { TagInfoResponse } from './dto/tag-info-response';
import { GetTagsDto } from './dto/get-tags-dto';
import { TagsInfoResponse } from './dto/tags-info-response';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создание тега' })
  @ApiCreatedResponse({
    type: CreateTagResponse,
    description: 'Тег успешно создан',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateTagDto })
  create(@Req() req: Request & { user: User }, @Body() dto: CreateTagDto) {
    return this.tagsService.create(req.user.uid, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение информации о нескольких тегах' })
  @ApiCreatedResponse({
    type: TagsInfoResponse,
    description: 'Информация о тегах получена',
  })
  @ApiBearerAuth()
  findAll(@Query() dto: GetTagsDto) {
    return this.tagsService.findAll(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение информации о теге' })
  @ApiCreatedResponse({
    type: TagInfoResponse,
    description: 'Информация о теге получена',
  })
  @ApiBearerAuth()
  findOne(@Param('id') id: number) {
    return this.tagsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменение информации о теге' })
  @ApiCreatedResponse({
    type: TagInfoResponse,
    description: 'Информация о теге изменена',
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateTagDto })
  update(
    @Param('id') id: number,
    @Body() updateTagDto: UpdateTagDto,
    @Req() req: Request & { user: User },
  ) {
    return this.tagsService.update(id, updateTagDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удаление тега' })
  @ApiCreatedResponse({
    type: String,
    description: 'Тег успешно удален',
  })
  @ApiBearerAuth()
  remove(@Param('id') id: number, @Req() req: Request & { user: User }) {
    return this.tagsService.remove(id, req.user.uid);
  }
}
