import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly hasingService: HashingServiceProtocol
  ) { }

  async findOne(id: number) {

    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        name: true,
        Task: true
      }
    })

    if (!user) {
      throw new HttpException('Esse usuario nao existe.', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {

    try {

      const passwordHash = await this.hasingService.hash(createUserDto.password)

      const userRegister = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          passwordHash: passwordHash
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

      const dataUser: { name?: string, passwordHash?: string } = {
        name: UpdateUserDto.name ?? user.name ?? undefined,
      }

      if (UpdateUserDto?.password) {
        const passwordHash = await this.hasingService.hash(UpdateUserDto?.password);
        dataUser['passwordHash'] = passwordHash
      }

      const updateUser = await this.prisma.user.update(
        {
          where: {
            id: user.id
          },
          data: {
            //fazendo um ternario para verificar se o campo foi enviado ou nao se nao foi enviado ele mantem o valor antigo
            name: dataUser.name,
            passwordHash: dataUser?.passwordHash ?? user.passwordHash
          },
          select: {
            id: true,
            email: true,
            name: true
          }
        })

      return {
        updateUser,
        message: "Usuarioa atualizado!"

      };

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
