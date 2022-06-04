import { IUserRepository } from 'src/domain/interface/interface.user.repository';
import { UserTypeOrmRepository } from './repositories/user.repository';

export default [
  {
    provide: IUserRepository,
    useClass: UserTypeOrmRepository,
  },
];
