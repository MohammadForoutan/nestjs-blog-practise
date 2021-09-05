import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, LoggerService } from '@nestjs/common';
import * as request from 'supertest';
import { getManager } from 'typeorm';
import { User } from '../src/user/user.entity';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { AuthController } from '../src/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../src/user/users.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

class TestLogger implements LoggerService {
  log(message: string) {}
  error(message: string, trace: string) {}
  warn(message: string) {}
  debug(message: string) {}
  verbose(message: string) {}
}

describe('AuthController E2E', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        JwtModule,
        ConfigModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            return {
              type: 'postgres',
              host: configService.get('DB_HOST'),
              port: configService.get('DB_PORT'),
              username: configService.get('DB_USERNAME'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get('DB_DATABSE'),
              autoLoadEntities: true, // add entities to entities array which they're register with forFeature method
              entities: ['src/**/*.entity.ts'],
              synchronize: true, // for development
            };
          },
        }),
        TypeOrmModule.forFeature([UserRepository]),
      ],
      providers: [AuthService, JwtService],
      controllers: [AuthController],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(new TestLogger());
    await app.init();
  });

  afterAll(async () => {
    // Closing the connection allows Jest to exit successfully.
    await Promise.all([app.close()]);
  });

  beforeEach(async () => {
    await getManager().delete(User, {});
  });

  it('should register a user successfully. =>  /auth/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        username: 'Mohammad',
        password: 'this-is-a-random-password',
      })
      .expect(201)
      .expect('');
  });

  it('should not register because of wrong credentials. =>  /auth/signup (POST)', async () => {
    const result = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        username: 'a',
        password: 'this-is-a-random-password',
      });

    expect(result.statusCode).toEqual(400);
  });
});
