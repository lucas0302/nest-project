import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

  //Simulando um banco de dados com um array
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Task One',
      description: 'First Task',
      completed: false
    }, {
      id: 2,
      name: 'Task two',
      description: 'second Task',
      completed: false
    },

  ];

  //buscar todas as tarefas
  findAll() {
    return this.tasks;
  }

  //buscar uma tarefa por ID
  findOne(id: number) {

    const task = this.tasks.find((tasks) => tasks.id === id);

    if (task) return task;

    throw new HttpException('Essa tarefa não existe.', HttpStatus.NOT_FOUND);

    return
  }

  //criar uma nova tarefa
  create(createTaskDto: CreateTaskDto) {
    const newId = this.tasks.length + 1;
    const newTask = {
      id: newId,
      ...createTaskDto,
      completed: false,
    }

    this.tasks.push(newTask);

    return newTask;
  }

  //update uma tarefa
  update(id: number, UpdateTaskDto: UpdateTaskDto) {

    const taskIndex = this.tasks.findIndex((tasks) => tasks.id === id)

    if (taskIndex < 0) {
      throw new HttpException('Essa tarefa não existe.', HttpStatus.NOT_FOUND);
    }

    const taskItem = this.tasks[taskIndex]
    this.tasks[taskIndex] = {
      ...taskItem,
      ...UpdateTaskDto,
    }

    return this.tasks[taskIndex];
  }

  //delete uma tarefa
  delete(id: number) {
    const deletedTask = this.tasks.findIndex((tasks) => tasks.id === id);

    if (deletedTask < 0) {
      throw new HttpException('Essa tarefa não existe.', HttpStatus.NOT_FOUND);
    }

    this.tasks.splice(deletedTask, 1);

    return { message: "Tarefa deletada com sucesso!" };
  }
}
