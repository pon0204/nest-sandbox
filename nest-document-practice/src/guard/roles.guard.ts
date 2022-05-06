import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  // カスタムメタデータにアクセス出来るようにする。
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(context.getClass());
    if (!roles) {
      // throw new BadRequestException();
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return false; // falseを返すとエラーが自動で起きてくれる
    // return matchRoles(roles,user.roles)
  }
}
