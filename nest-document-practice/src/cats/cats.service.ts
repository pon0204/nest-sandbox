import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

// @Injectable({ scope: Scope.REQUEST }) // リクエストのたびにインスタンスを作製する。
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  private readonly cat: Cat = {} as Cat;

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    return this.cat;
  }
}
