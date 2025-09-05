import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';

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
  findOne(id: string) {

    const task = this.tasks.find((tasks) => tasks.id === Number(id));

    if (task) return task;

    throw new HttpException('Essa tarefa não existe.', HttpStatus.NOT_FOUND);

    return
  }

  //criar uma nova tarefa
  create(body: any) {
    const newId = this.tasks.length + 1;
    const newTask = {
      id: newId,
      ...body,
    }

    this.tasks.push(newTask);

    return newTask;
  }

  //update uma tarefa
  update(id: string, body: any) {

    const taskIndex = this.tasks.findIndex((tasks) => tasks.id === Number(id))

    if (taskIndex < 0) {
      throw new HttpException('Essa tarefa não existe.', HttpStatus.NOT_FOUND);
    }

    const taskItem = this.tasks[taskIndex]
    this.tasks[taskIndex] = {
      ...taskItem,
      ...body,
    }

    return this.tasks[taskIndex];
  }

  //delete uma tarefa
  delete() {
    return "Deletar tarefa....";
  }
}
