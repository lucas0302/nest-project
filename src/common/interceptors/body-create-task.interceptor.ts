import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class BodyCreateTaskInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;

    console.log(`[REQUET]: ${method} - URL: ${url}`);
    console.log(`[Body]: ${JSON.stringify(body, null, 2)}`);
    return next.handle();
  }
}