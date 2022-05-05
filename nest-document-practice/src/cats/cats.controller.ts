import {
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

@Controller('cats')
export class CatsController {
  @Post()
  @Header('Cache-Control', 'none')
  @HttpCode(204)
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  // @Get('ab*cd') // ワイルドカード
  // @Redirect('https://nestjs.com', 301) // リダイレクト
  findAll(@Req() request: Request): string {
    console.log(request);
    return 'This action returns all cats';
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
