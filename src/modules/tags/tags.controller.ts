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
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
    @Req() req: Request & { user: User },
  ) {
    return this.tagsService.update(+id, updateTagDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req: Request & { user: User }) {
    return this.tagsService.remove(+id, req.user.uid);
  }
}
