import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from "express";
import { timestamp } from "rxjs";
import { json } from "stream/consumers";

@Catch(HttpException)
export class ApiExeceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const resposse = ctx.getResponse<Response>();
    const request = ctx.getResponse<Request>();
    const status = exception.getStatus()
    const errorResponse = exception.getResponse()

    resposse.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: errorResponse !== "" ? errorResponse : "Erro ao realizar essa operação.",
      path: request.url
    })


  }

}