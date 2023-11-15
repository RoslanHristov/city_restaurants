import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from "./utils/globalUncaughtExceptionFilter";

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(5000);
  logger.log(`Application listening on port 5000`);
}

bootstrap();
