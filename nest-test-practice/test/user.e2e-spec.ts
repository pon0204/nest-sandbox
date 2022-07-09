import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';
import { UserModule } from '../src/user/user.module';
import { CreateUserDto } from '../src/user/dto/create-user.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const mockUsers: User[] = [
    { id: 1, firstName: 'つよし', lastName: 'いとう', isActive: true },
  ];

  const mockUserRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(mockUsers);
  });

  it('/user (POST)', () => {
    const dto: CreateUserDto = {
      firstName: 'つよし',
      lastName: 'いとう',
      isActive: true,
    };
    return request(app.getHttpServer())
      .post('/user')
      .send(dto)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          ...dto,
        });
      });
  });

  it('/user (POST) --> 400 on validation error', () => {
    const dto = {
      firstName: 1,
      lastName: 'いとう',
      isActive: true,
    };
    return request(app.getHttpServer())
      .post('/user')
      .send(dto)
      .expect('Content-Type', /json/)
      .expect(400, {
        statusCode: 400,
        message: ['firstName must be a string'],
        error: 'Bad Request',
      });
  });
});
