import { IsString, IsNumber, Min, Max, IsFullWidth } from 'class-validator';

export class CreateCatDto {
  /**
   * 猫の名前が入ります。
   */
  @IsString()
  name: string = 'たま';

  @IsNumber()
  @Min(0)
  @Max(20)
  age: number;

  @IsString()
  breed: string;
}
