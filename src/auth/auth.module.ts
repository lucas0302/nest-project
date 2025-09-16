import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';

// modulo global - pode ser usado na aplicaçao inteira (nao tem que importar em outros modulos para usar)
@Global()
@Module({
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BcryptService
    }
  ],
  exports: [
    HashingServiceProtocol
  ]

})
export class AuthModule { }
