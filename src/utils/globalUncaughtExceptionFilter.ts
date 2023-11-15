import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: any) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (!exception.response) {
      const statusCode =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const errMessage =
        exception instanceof HttpException
          ? exception.message || exception.message?.["error"]
          : "Internal server error";

      response.status(500).json({
        statusCode,
        message: `Whoops something went wrong, but it's fine :) ! \n ${errMessage}`,
      });
    } else {
      response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        message: exception.response.message,
      });
    }
  }
}
