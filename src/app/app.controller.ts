import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/teste')
  getTeste(): string {
    return "Rota de Teste da api";
  }
  @Post('/criar')
  criarTarefa() {
    return "Tarefa criada com sucesso!";
  }
}
