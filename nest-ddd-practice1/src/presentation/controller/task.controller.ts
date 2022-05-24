import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CreateTaskCommand } from 'src/application/commands/create-task.command';
import { CreateTaskUseCase } from 'src/application/use-case/create-task.usecase';
import { GetAllTasksUseCase } from 'src/application/use-case/get-all-tasks.usecase';

import {
  DefaultExceptionPresenter,
  UnexpectedExceptionPresenter,
} from '../exception-presenters';

import {
  GetAllTasksResponseDto,
  CreateTaskRequestDto,
  CreateTaskResponseDto,
} from './task.controller.dtos';

@Controller('tasks')
@UseFilters(DefaultExceptionPresenter, UnexpectedExceptionPresenter)
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getAllTasksUseCase: GetAllTasksUseCase,
  ) {}

  @Get()
  async getAll(): Promise<GetAllTasksResponseDto> {
    const tasks = await this.getAllTasksUseCase.handle();

    return new GetAllTasksResponseDto(tasks);
  }

  @Post()
  async createOne(
    @Body() createTaskRequestDto: CreateTaskRequestDto,
  ): Promise<CreateTaskResponseDto> {
    await this.createTaskUseCase.handle(
      new CreateTaskCommand(createTaskRequestDto.name),
    );

    return { statusCode: HttpStatus.OK };
  }
}
