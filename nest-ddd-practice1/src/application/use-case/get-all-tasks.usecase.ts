import { Injectable } from '@nestjs/common';
import { Task } from 'src/domain/domain-object/entity/task';
import { ITaskRepository } from 'src/domain/i-repository/i-task.repository';

@Injectable()
export class GetAllTasksUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async handle(): Promise<Task[]> {
    return this.taskRepository.getAll();
  }
}
