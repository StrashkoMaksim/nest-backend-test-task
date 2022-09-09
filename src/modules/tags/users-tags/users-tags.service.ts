import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersTagsRepository } from './users-tags.repository';
import { AddTagsDto } from './dto/add-tags-dto';
import { TagsRepository } from '../tags.repository';

@Injectable()
export class UsersTagsService {
  constructor(
    private userTagsRepository: UsersTagsRepository,
    private tagsRepository: TagsRepository,
  ) {}

  async add(uid: string, dto: AddTagsDto) {
    for (const tag of dto.tags) {
      if (!(await this.tagsRepository.getById(tag))) {
        throw new NotFoundException('Один из тегов не найден');
      }
    }

    await this.userTagsRepository.add(uid, dto);
    const tags = await this.userTagsRepository.findUserTags(uid);

    return { tags };
  }

  async getMy() {}

  async remove() {}
}
