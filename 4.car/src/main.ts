import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieSession = require('cookie-session');//this is because of tsconfig file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys:['assskkkkkk']
  }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  await app.listen(3002);
}
bootstrap();
