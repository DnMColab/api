import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { swaggerOptions } from './swagger/index.swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  app.getHttpAdapter().get('/openapi.json', (req, res) => {
    res.json(document);
  });

  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
