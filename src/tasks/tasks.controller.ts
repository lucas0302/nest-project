import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { identity } from 'rxjs';

@Controller('/tasks')
export class TasksController {

  constructor(readonly tasksService: TasksService) { }

  @Get()
  FindAllTasks() {
    return this.tasksService.FindAll();
  }

  @Get(':id')
  FindOneTask(@Param('id') id: string) {
    console.log(id);
    return this.tasksService.findOne(id);
  }
}
