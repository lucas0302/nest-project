import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {

  private tasks: Task[] = [
    {
      id: 1,
      name: 'Task One',
      descriptions: 'First Task',
      completed: false
    }, {
      id: 2,
      name: 'Task two',
      descriptions: 'second Task',
      completed: false
    },

  ];

  findAll() {
    return this.tasks;
  }

  findOne(id: string) {

    return this.tasks.find((tasks) => tasks.id === Number(id));
  }

  create(body: any) {
    const newId = this.tasks.length + 1;
    const newTask = {
      id: newId,
      ...body,
    }

    this.tasks.push(newTask);

    return newTask;
  }

  update() {
    return "Atualizar tarefa....";
  }

  delete() {
    return "Deletar tarefa....";
  }
}
