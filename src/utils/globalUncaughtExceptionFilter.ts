import { Catch, ExceptionFilter } from "@nestjs/common";
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: any) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (!exception.response) {
      response.status(500).json({
        statusCode: 500,
        message: `Whoops something went wrong, but it's fine :) !`,
        exception: `(DEV PURPUSE LOGGING) ${exception} `,
      });
    } else {
      response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        message: exception.response.message,
      });
    }
  }
}
