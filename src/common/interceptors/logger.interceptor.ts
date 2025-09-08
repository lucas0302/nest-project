import { ExecutionContext, NestInterceptor, CallHandler, Injectable } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();
    console.log(`[REQUET]: ${method} - URL: ${url} - Tempo: ${now}`);

    return next.handle().pipe(
      tap(
        () => console.log(`[RESPONSE]: ${method} - URL: ${url} - Tempo de resposta: ${Date.now() - now}ms`)
      )
    );
  }
}