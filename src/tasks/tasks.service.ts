import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  listAllTasks() {
    return [
      { id: 1, task: 'play a soccer' },
      { id: 2, task: 'study 7PM' },
      { id: 3, task: 'sleep' },
    ];
  }

  findOneTask() {
    return { id: 1, task: 'task 1' };
  }
}
