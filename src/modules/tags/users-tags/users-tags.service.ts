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

  async getMy(uid: string) {
    const tags = await this.tagsRepository.getMy(uid);

    return { tags };
  }

  async remove(id: number, uid: string) {
    await this.userTagsRepository.remove(id);

    const tags = await this.userTagsRepository.findUserTags(uid);

    return { tags };
  }
}
