import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  // Redirect,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@UseFilters(HttpExceptionFilter) // カスタムフィルターを追加
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Header('Cache-Control', 'none')
  @HttpCode(204)
  create(@Body() createCatDto: CreateCatDto) {
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
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
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
