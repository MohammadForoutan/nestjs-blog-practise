import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger, LoggerService } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

let app: INestApplication;
beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll((done) => {
  // Closing the connection allows Jest to exit successfully.
  app.close();
  done();
});

describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
