import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  FindAll() {
    return [
      { id: 1, task: 'play a soccer' },
      { id: 2, task: 'study 7PM' },
      { id: 3, task: 'sleep' },
    ];
  }

  findOne(id: string) {
    return "O [id] que voce Busca é: " + id;
  }

  create(body: any) {
    return "Criando uma tarefa com o nome de: " + body.name;
  }
}
