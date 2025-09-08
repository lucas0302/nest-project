/*
DTO > Data Transfer Object (Objeto de Transferência de Dados)
> validar dados, transformar dados
 > se usa para representar quais dados e em que formatos em que determinada camada aceita ou retorna
*/

import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTaskDto {
  @IsString({ message: 'O nome deve ser uma texto' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly description: string;
}