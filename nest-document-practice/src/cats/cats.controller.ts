import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  // Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
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
