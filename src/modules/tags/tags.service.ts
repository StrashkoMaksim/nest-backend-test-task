import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsRepository } from './tags.repository';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TagsService {
  constructor(private tagsRepository: TagsRepository) {}

  async create(creatorId: string, dto: CreateTagDto) {
    const candidate = await this.tagsRepository.getByName(dto.name);
    if (candidate) {
      throw new ConflictException([
        'name - Тег с таким названием уже существует',
      ]);
    }

    const tag = await this.tagsRepository.create(creatorId, dto);

    return {
      id: String(tag.getId()),
      name: tag.getName(),
      sortOrder: String(tag.getSortOrder()),
    };
  }

  findAll() {
    return `This action returns all tags`;
  }

  async findOne(id: number) {
    console.log(1);
    const tag = await this.tagsRepository.getById(id);
    console.log(tag);
    return `This action returns a #${id} tag`;
  }

  async update(id: number, dto: UpdateTagDto, user: User) {
    const tag = await this.tagsRepository.getById(id);
    if (!tag) {
      throw new NotFoundException('Тег с указанным ID не найден');
    }

    if (tag.getCreator() !== user.uid) {
      throw new ForbiddenException('Вы не являетесь создателем тега');
    }

    if (dto.name) tag.setName(dto.name);
    if (dto.sortOrder) tag.setSortOrder(dto.sortOrder);

    await this.tagsRepository.update(tag);

    return {
      creator: {
        nickname: user.nickname,
        uid: user.uid,
      },
      name: tag.getName(),
      sortOrder: String(tag.getSortOrder()),
    };
  }

  async remove(id: number, userId: string) {
    const tag = await this.tagsRepository.getById(id);
    if (!tag) {
      throw new NotFoundException('Тег с указанным ID не найден');
    }

    if (tag.getCreator() !== userId) {
      throw new ForbiddenException('Вы не являетесь создателем тега');
    }

    await this.tagsRepository.remove(id);

    return `Тег успешно удален`;
  }
}
