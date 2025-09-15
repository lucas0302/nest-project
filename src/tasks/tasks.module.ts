import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaModule } from '../prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { ApiExeceptionFilter } from 'src/common/filters/exception-filter';
import { TeskUtils } from './tasks.utils';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    TeskUtils,
    {
      provide: APP_FILTER,
      useClass: ApiExeceptionFilter
    },
    {
      provide: "KEY_TOKEN",
      useValue: "TOKEM_123456789"
    }
  ],
})
export class TasksModule { }
