import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  // Redirect,
  Req,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/decorator/roles.decorator';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { RoleGuard } from 'src/guard/roles.guard';
import { CacheInterceptor } from 'src/interceptor/cache.interceptor';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@UseGuards(RoleGuard)
@UseFilters(HttpExceptionFilter) // カスタムフィルターを追加
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
// @UseInterceptors(CacheInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Header('Cache-Control', 'none')
  @HttpCode(204)
  @Roles('admin')
  create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  // @Get('ab*cd') // ワイルドカード
  // @Redirect('https://nestjs.com', 301) // リダイレクト
  async findAll(@Req() request: Request): Promise<Cat[]> {
    // throw new ForbiddenException();
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // console.log(request);
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    // @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number, // 引数に値を入れることで、nullやundefindに対応出来る。
  ) {
    return this.catsService.findOne(id);
  }

  // @Get(':id')
  // findOne(
  //   @Param() params): string {
  //   console.log(params.id);
  //   return `This action returns a #${params.id} cat`;
  // }
}

// サブドメインのルーティング
// @Controller({ host: 'admin.example.com' })
// export class AdminController {
//   @Get()
//   index(): string {
//     return 'Admin page';
//   }
// }

// サブドメインパラメーターの取得
// @Controller({ host: ':account.example.com' })
// export class AccountController {
//   @Get()
//   getInfo(@HostParam('account') account: string) {
//     return account;
//   }
// }
