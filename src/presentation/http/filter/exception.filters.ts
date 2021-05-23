import { HttpException, HttpStatus } from '@nestjs/common';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { BusinessError } from 'src/core/error/business.error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost): void {
    const response: Response = host.switchToHttp().getResponse<Response>();
    const request: Request = host.switchToHttp().getRequest<Request>();
    if (error instanceof BusinessError) {
      response.status(error.httpCode).json({
        errorCode: error.code,
        errorMessage: error.message,
        timestamp: new Date().toISOString(),
      });
    } else {
      const code =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      response.status(code).json({
        statusCode: code,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    this.logError(
      request.method,
      request.url,
      response.statusCode,
      error.message,
    );
  }

  private logError(
    method: string,
    path: string,
    errorCode: number,
    errorMessage: string,
  ) {
    console.log(
      `Method: ${method} Path: ${path} Code: ${errorCode} Error: ${errorMessage}`,
    );
  }
}
