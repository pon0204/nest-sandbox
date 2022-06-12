import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsFullWidth,
  IsEnum,
} from 'class-validator';
import { CatBreedEnum } from '../constans/breedEnum';

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

  @IsEnum(CatBreedEnum)
  breed: CatBreedEnum;
}
