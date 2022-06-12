import { CatBreedEnum } from '../constans/breedEnum';

export class Cat {
  id: number;
  name: string;
  age: number;
  breed: CatBreedEnum;
}

export class CatRes extends Cat {
  // 必要な値があれば追加
}
