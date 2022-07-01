import { Injectable } from '@nestjs/common';
import { CatRes } from './dto/cat-res.dto';
import { Cat } from './interfaces/cat.interface';

// @Injectable({ scope: Scope.REQUEST }) // リクエストのたびにインスタンスを作製する。
@Injectable()
export class CatsService {
  // 循環依存の解決
  // constructor(
  // @Inject(forwardRef(() => CommonService))
  // private commonService: CommonService,
  // ) {}
  private readonly cats: Cat[] = [];
  private readonly cat: Cat = {} as Cat;

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): CatRes {
    return new CatRes('たま', 19, 'nyanko');
    // return this.cats;
  }

  findOne(id: number): Cat {
    return this.cat;
  }
}
