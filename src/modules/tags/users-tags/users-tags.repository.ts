import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { AddTagsDto } from './dto/add-tags-dto';

@Injectable()
export class UsersTagsRepository {
  constructor(private databaseService: DatabaseService) {}

  async add(uid: string, dto: AddTagsDto) {
    const values = dto.tags.map((tag) => `('${uid}', ${tag})`).join(', ');

    await this.databaseService.executeQuery(`
      INSERT INTO users_tags (userId, tagId)
      VALUES ${values}
      ON CONFLICT ON CONSTRAINT user_tag_unique DO NOTHING;
    `);
  }

  async findUserTags(uid) {
    const res = await this.databaseService.executeQuery(`
      SELECT * FROM users_tags
      LEFT OUTER JOIN tags ON users_tags.tagId = tags.id
      WHERE users_tags.userId = '${uid}';
    `);

    const tags = res.map((tag) => ({
      id: tag.id,
      name: tag.name,
      sortOrder: String(tag.sortorder),
    }));

    return tags;
  }

  async remove(id: number) {
    await this.databaseService.executeQuery(`
      DELETE FROM users_tags WHERE tagId = ${id};
    `);
  }

  async getMy() {}
}
