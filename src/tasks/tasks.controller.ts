import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { identity } from 'rxjs';

@Controller('/tasks')
export class TasksController {

  constructor(readonly tasksService: TasksService) { }

  @Get()
  getTasks() {
    return this.tasksService.listAllTasks()
  }

  @Get('/1')
  getTask() {
    return this.tasksService.findOneTask()
  }
}
