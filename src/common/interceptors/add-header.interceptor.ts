import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {

    const response = context.switchToHttp().getResponse();
    response.setHeader('X-Custom-Header', 'valor da chave 131');

    return next.handle();
  }
}