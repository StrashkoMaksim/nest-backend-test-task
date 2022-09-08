import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsRepository {
  constructor(private databaseService: DatabaseService) {}

  async getByName(name: string): Promise<Tag | undefined> {
    const res = await this.databaseService.executeQuery(`
      SELECT * FROM tags WHERE name = '${name}';
    `);

    if (res[0]) {
      const tag = new Tag(
        res[0].id,
        res[0].creator,
        res[0].name,
        res[0].sortOrder,
      );
      return tag;
    }
  }

  async create(creator: string, dto: CreateTagDto): Promise<Tag> {
    const values: any[] = [dto.name, creator];
    if (dto.sortOrder) values.push(dto.sortOrder);

    const res = await this.databaseService.executeQuery(
      `
      INSERT INTO tags (name, creator${dto.sortOrder ? ', sortOrder' : ''})
      VALUES ($1, $2${dto.sortOrder ? ', $3' : ''})
      RETURNING *;
    `,
      values,
    );
    const tag = new Tag(
      res[0].id,
      res[0].creator,
      res[0].name,
      res[0].sortorder,
    );
    return tag;
  }
}
