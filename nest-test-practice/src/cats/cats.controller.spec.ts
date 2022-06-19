import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsService = module.get<CatsService>(CatsService);
    catsController = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(catsController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const cats = catsController.findAll();
      const result = [
        { id: 1, name: 'たま' },
        { id: 2, name: 'にゃー' },
      ];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);
      expect(cats).toEqual(result);
    });
  });
});
