import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Proto')
  .setDescription('The Proto API description')
  .setVersion('0.1.0-pre')
  .addTag('nestjs')
  .build();
