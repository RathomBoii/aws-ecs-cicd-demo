import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // Enable CORS with the appropriate settings
  // for development only
  app.enableCors({
    origin: [process.env.ALLOWED_ORIGIN], // Allow the frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  });

  console.log("process.env.ALLOWED_ORIGIN: ", process.env.ALLOWED_ORIGIN)

  const port = process.env.PORT || 4000;
  await app.listen(port);

  Logger.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
