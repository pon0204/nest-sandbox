import { Expose, Transform } from 'class-transformer';

export class CatRes {
  constructor(name: string, age: number, breed: string) {
    (this.name = name), (this.age = age), (this.breed = breed);
  }
  // @Transform(({ value, key }) => '名前上書き')
  name: string;
  age: number;
  breed: string;

  @Expose() // レスポンスにプロバティとして追加できる。
  get profile(): string {
    return `名前: ${this.name} 年齢:${this.age}歳 種類:${this.breed}`;
  }
}

// @Transform(({ value, key, obj, type }) => value)
// value	変換前のプロパティ値。
// key	変換されたプロパティの名前。
// obj	変換ソースオブジェクト。
// type	変換タイプ。
// options	変換メソッドに渡されるオプションオブジェクト。
