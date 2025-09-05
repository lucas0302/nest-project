import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { identity } from 'rxjs';

@Controller('/tasks')
export class TasksController {

  constructor(readonly tasksService: TasksService) { }

  //Route para buscar todas as tarefas
  @Get()
  FindAllTasks() {
    return this.tasksService.findAll();
  }

  //Route para buscar uma tarefa por ID
  @Get(':id')
  FindOneTask(@Param('id') id: string) {
    console.log(id);
    return this.tasksService.findOne(id);
  }

  //Route para criar uma nova tarefa
  @Post()
  CreateTask(@Body() body: any) {
    console.log(body);
    return this.tasksService.create(body);
  }

  @Patch(':id')
  updateTask(@Param("id") id: string, @Body() body: any) {

    return this.tasksService.update(id, body);;
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    console.log("ID Enviado " + id);

    return "Deletar o Id com o numero: " + id;
  }
}