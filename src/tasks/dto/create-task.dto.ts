/*
DTO > Data Transfer Object (Objeto de Transferência de Dados)
> validar dados, transformar dados
 > se usa para representar quais dados e em que formatos em que determinada camada aceita ou retorna
*/

export class CreateTaskDto {
  readonly name: string;
  readonly description: string;
}