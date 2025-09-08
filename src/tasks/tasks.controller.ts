import { Body, Controller, Get, Param, Patch, Post, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
@Controller('/tasks')
export class TasksController {

  constructor(readonly tasksService: TasksService) { }

  //Route para buscar todas as tarefas
  @Get()
  FindAllTasks(@Query() paginationDto: PaginationDto) {
    return this.tasksService.findAll(paginationDto);
  }

  //Route para buscar uma tarefa por ID
  @Get(':id')
  FindOneTask(@Param('id', ParseIntPipe) id: number) {

    return this.tasksService.findOne(id);
  }

  //Route para criar uma nova tarefa
  @Post()
  CreateTask(@Body() createTaskDto: CreateTaskDto) {

    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() UpdateTaskDto: UpdateTaskDto) {

    return this.tasksService.update(id, UpdateTaskDto);;
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {

    return this.tasksService.delete(id);
  }
}