import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findOne(id: number) {

    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    if (!user) {
      throw new HttpException('Esse usuario nao existe.', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {

    try {
      const userRegister = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          passwordHash: createUserDto.password
        },
        select: {
          id: true,
          email: true,
          name: true
        }

      });
      return userRegister;

    } catch (err) {
      console.log(err);
      throw new HttpException('Erro ao cadastrar usuario.', HttpStatus.BAD_REQUEST);
    }

  }

  async update(id: number, UpdateUserDto: UpdateUserDto) {
    try {

      const user = await this.prisma.user.findFirst({
        where: {
          id: id
        },
      });

      if (!user) {
        throw new HttpException('Esse usuario nao existe.', HttpStatus.NOT_FOUND);
      }

      const updateUser = await this.prisma.user.update(
        {
          where: {
            id: user.id
          },
          data: {
            //fazendo um ternario para verificar se o campo foi enviado ou nao se nao foi enviado ele mantem o valor antigo
            name: UpdateUserDto.name ? UpdateUserDto.name : user.name,
            passwordHash: UpdateUserDto.password ? UpdateUserDto.password : user.passwordHash
          },
          select: {
            id: true,
            email: true,
            name: true
          }
        })

      return updateUser;

    } catch (err) {
      console.log(err);
      throw new HttpException('Falha ao atualizar usuario.', HttpStatus.BAD_REQUEST);
    }

  }

  async delete(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: id
        },
      });

      if (!user) {
        throw new HttpException('Esse usuario nao existe.', HttpStatus.BAD_REQUEST);
      }

      await this.prisma.user.delete({
        where: {
          id: user.id
        }
      });

      return { message: "usuario deletado!" };

    } catch (err) {
      console.log(err);
      throw new HttpException('Falha ao deletar usuario.', HttpStatus.BAD_REQUEST);
    }
  }

}
