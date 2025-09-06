import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

/*
- src/app/app.module.ts modulo principal da aplicação
- src/app.controller.ts define as rotas e lida com as requisições
- src/app.service.ts contém a lógica de negócio separada do controlador
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
