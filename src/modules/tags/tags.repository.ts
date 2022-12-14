import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { GetTagsDto } from './dto/get-tags-dto';
import { TagInfoResponse } from "./dto/tag-info-response";

@Injectable()
export class TagsRepository {
  constructor(private databaseService: DatabaseService) {}

  async getById(id: number): Promise<Tag | undefined> {
    const res = await this.databaseService.executeQuery(`
      SELECT * FROM tags LEFT OUTER JOIN users ON tags.creator = users.uid WHERE id = '${id}';
    `);
    console.log(res);
    if (res[0]) {
      const tag = new Tag(
        res[0].id,
        res[0].creator,
        res[0].name,
        res[0].sortorder,
      );
      tag.setCreatorInfo({ nickname: res[0].nickname, uid: res[0].uid });
      return tag;
    }
  }

  async getByName(name: string): Promise<Tag | undefined> {
    const res = await this.databaseService.executeQuery(`
      SELECT * FROM tags WHERE name = '${name}';
    `);

    if (res[0]) {
      const tag = new Tag(
        res[0].id,
        res[0].creator,
        res[0].name,
        res[0].sortorder,
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

  async update(tag: Tag) {
    await this.databaseService.executeQuery(`
      UPDATE tags
      SET
        name = '${tag.getName()}',
        sortorder = ${tag.getSortOrder()}
      WHERE id = ${tag.getId()};
    `);
  }

  async remove(id: number) {
    await this.databaseService.executeQuery(`
      DELETE FROM tags WHERE id = ${id};
    `);
  }

  async findAll(
    dto: GetTagsDto,
  ): Promise<
    { creator: { uid: any; nickname: any }; sortOrder: string; name: any }[]
  > {
    const res = await this.databaseService.executeQuery(`
      SELECT * FROM tags
      LEFT OUTER JOIN users ON tags.creator = users.uid
      ${
        dto.sortByOrder || dto.sortByName
          ? `ORDER BY
          ${dto.sortByOrder ? `tags.sortorder ASC` : ''}
          ${dto.sortByOrder && dto.sortByName ? ', ' : ''}
          ${dto.sortByName ? `tags.name ASC` : ''}
          `
          : ''
      }
      ${dto.length ? `LIMIT ${dto.length}` : ''}
      ${dto.offset ? `OFFSET ${dto.offset}` : ''};
    `);

    const tags = res.map((row) => ({
      creator: {
        nickname: row.nickname,
        uid: row.uid,
      },
      name: row.name,
      sortOrder: String(row.sortorder),
    }));

    return tags;
  }

  async getQuantity(): Promise<number> {
    const res = await this.databaseService.executeQuery(`
      SELECT COUNT(*) FROM tags;
    `);
    return res[0].count;
  }

  async getMy(uid: string) {
    const res = await this.databaseService.executeQuery(`
      SELECT id, name, sortOrder FROM tags WHERE creator = '${uid}';
    `);

    const tags = res.map((tag) => ({
      id: tag.id,
      name: tag.name,
      sortOrder: String(tag.sortorder),
    }));

    return tags;
  }
}
