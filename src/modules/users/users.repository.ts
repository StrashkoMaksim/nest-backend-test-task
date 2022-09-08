import { DatabaseService } from '../database/database.service';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { GetUserResponse } from './users.types';

@Injectable()
export class UsersRepository {
  constructor(private databaseService: DatabaseService) {
    databaseService.executeQuery(`
      
    `);
  }

  async createUser(
    email: string,
    password: string,
    nickname: string,
  ): Promise<User> {
    const res: GetUserResponse[] = await this.databaseService.executeQuery(
      `
      INSERT INTO users (email, password, nickname)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
      [email, password, nickname],
    );
    return new User(res[0].uid, res[0].email, res[0].password, res[0].nickname);
  }

  async getByEmail(email: string): Promise<GetUserResponse> {
    const result: GetUserResponse[] = await this.databaseService.executeQuery(
      `SELECT * FROM users WHERE email = '${email}';`,
    );
    return result[0];
  }

  async getByNickname(nickname: string): Promise<GetUserResponse> {
    const result: GetUserResponse[] = await this.databaseService.executeQuery(
      `SELECT * FROM users WHERE nickname = '${nickname}';`,
    );
    return result[0];
  }

  async updateUser(user: User) {
    const result = await this.databaseService.executeQuery(`
      UPDATE users
      SET
        ${user.email ? `email = '${user.email}', ` : ''}
        ${user.password ? `password = '${user.password}', ` : ''}
        ${user.nickname ? `nickname = '${user.nickname}' ` : ''}
      WHERE uid = '${user.uid}'
      RETURNING email, nickname;
    `);
    return result[0];
  }

  async removeUser(uid: string) {
    await this.databaseService.executeQuery(`
      DELETE FROM users WHERE uid = '${uid}';
    `)
  }
}
