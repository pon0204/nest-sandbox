import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AbilityFactory, Action } from '../ability/ability.factory';
import { User } from './entities/user.entity';
import { ForbiddenError } from '@casl/ability';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { ReadUserAbility } from '../ability/abilities.decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = { id: 1, isAdmin: false, orgId: 1 };
    const ability = this.abilityFactory.defineAbility(user);

    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Create, User);
      return this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Get()
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(new ReadUserAbility())
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(new ReadUserAbility())
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = { id: 1, isAdmin: true, orgId: 1 };

    try {
      return this.userService.update(+id, updateUserDto, user);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Delete(':id')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: User })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
