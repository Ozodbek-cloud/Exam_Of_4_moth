import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/config/Swagger.setupt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  await setupSwagger(app)

  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 3000);
  console.log(`http://localhost:4000/api_ozodbek_swagger`);
  
}
bootstrap();
