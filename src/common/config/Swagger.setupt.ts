import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Movie Platform')
    .setDescription('The Movie API description')
    .setVersion('1.0')
    .addTag('Movies')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_ozodbek_swagger', app, document);
}