import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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

    return this.tasksService.findOne(id);
  }

  //Route para criar uma nova tarefa
  @Post()
  CreateTask(@Body() createTaskDto: CreateTaskDto) {

    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  updateTask(@Param("id") id: string, @Body() UpdateTaskDto: UpdateTaskDto) {

    return this.tasksService.update(id, UpdateTaskDto);;
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {

    return this.tasksService.delete(id);
  }
}