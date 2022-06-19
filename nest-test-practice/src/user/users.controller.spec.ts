import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UsersController', () => {
  let controller: UserController;

  const mockUserService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        isActive: true,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create a user', () => {
    expect(
      controller.create({ firstName: 'つよし', lastName: 'いとう' }),
    ).toEqual({
      id: expect.any(Number),
      firstName: 'つよし',
      lastName: 'いとう',
      isActive: true,
    });
  });
});
