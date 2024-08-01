import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './common/docs/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  const port = configService.get<number>('PORT') ?? 9889;
  const apiPrefix = configService.get<string>('API_PREFIX');
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(apiPrefix, app, document);
  await app.listen(port);
}
bootstrap();
