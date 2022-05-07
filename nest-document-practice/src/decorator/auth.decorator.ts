import { SetMetadata, UseGuards } from '@nestjs/common';

// 複数のデコレーターをまとめて宣言できる。
// export function Auth(...roles: Role[]) {
//   SetMetadata('roles', roles),
//     UseGuards(AuthGuard, RolesGuard),
//     ApiBearerAuth(),
//     ApiUnauthorizedResponse({ description: 'Unauthorized' }),
// }

// @Get('users')
// @Auth('admin')
// findAllUsers() {}
