import { Controller, Get } from '@nestjs/common';

@Controller('/tasks')
export class TasksController {

  @Get()
  getTasks() {
    return 'Listando todas as tarefas de tasks';
  }
  @Get('/task')
  getTask() {
    return 'Tarefa 1';
  }
}
