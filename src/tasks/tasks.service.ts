import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService) { }
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
  async findAll(paginationDto?: PaginationDto) {
    console.log(paginationDto);
    const { limit = 10, offset = 0 } = paginationDto || {};

    const allTasks = await this.prisma.task.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' }
    }
    );
    return allTasks;
  }

  //buscar uma tarefa por ID
  async findOne(id: number) {
    const task = await this.prisma.task.findFirst({
      where: { id: id }
    });

    if (task?.name) {
      return task;
    }
    throw new HttpException('Essa tarefa não existe.', HttpStatus.NOT_FOUND);
  }

  //criar uma nova tarefa
  async create(createTaskDto: CreateTaskDto) {
    const newTask = await this.prisma.task.create(
      {
        data: {
          name: createTaskDto.name,
          description: createTaskDto.description,
          completed: false
        }
      }
    );

    return newTask;
  }

  //update uma tarefa
  async update(id: number, UpdateTaskDto: UpdateTaskDto) {
    try {
      const findTaslk = await this.prisma.task.findFirst({
        where: {
          id: id
        }
      });

      if (!findTaslk) {
        throw new HttpException('Essa tarefa não existe.', HttpStatus.NOT_FOUND);
      }

      const taks = await this.prisma.task.update({
        where: {
          id: findTaslk.id
        },
        data: UpdateTaskDto

      })

      return taks;

    } catch (err) {
      throw new HttpException('Erro ao atualizar a tarefa.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //delete uma tarefa
  async delete(id: number) {
    try {
      const findTask = await this.prisma.task.findFirst({
        where: {
          id: id
        }
      })

      if (!findTask) {
        throw new HttpException('Essa tarefa não existe.', HttpStatus.NOT_FOUND);
      }

      await this.prisma.task.delete({
        where: {
          id: findTask.id
        }
      });

      return { message: 'Tarefa deletada com sucesso!' };

    } catch (err) {

      throw new HttpException('Erro ao deletar a tarefa.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
