import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsRepository } from './tags.repository';

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

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
