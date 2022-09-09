import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/modules/users/users.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/signin (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/signin')
      .send({
        email: 'user@mail.ru',
        password: 'TestPass007',
        nickname: 'Nickname007',
      });
    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
    expect(response.body.expires).toEqual('1800');
    expect(response.body.token).toBeDefined();

    token = `Bearer ${response.body.token}`;
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', token);
    expect(response.status).toEqual(200);
  });
});
