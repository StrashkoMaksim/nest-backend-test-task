import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsRepository {
  constructor(private databaseService: DatabaseService) {}

  async getByName(name: string): Promise<Tag> {
    const res = await this.databaseService.executeQuery(`
      SELECT * FROM tags WHERE name = '${name}';
    `);
    const tag = new Tag(
      res[0].id,
      res[0].creator,
      res[0].name,
      res[0].sortOrder,
    );
    return tag;
  }

  async create(dto: CreateTagDto): Promise<Tag> {
    const res = await this.databaseService.executeQuery(
      `
      INSERT INTO tags (name, sortOrder)
      VALUES ($1, $2)
      RETURNING *;
    `,
      [dto.name, dto.sortOrder],
    );
    const tag = new Tag(
      res[0].id,
      res[0].creator,
      res[0].name,
      res[0].sortOrder,
    );
    return tag;
  }
}
