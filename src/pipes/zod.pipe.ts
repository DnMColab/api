import { HttpException, PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any): any {
    try {
      this.schema.parse(value);
      return value;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpException(
          {
            message: 'Validation failed',
            errors: error.flatten(),
          },
          400,
        );
      }
      throw new HttpException(
        {
          message: 'Internal server error',
        },
        500,
      );
    }
  }
}
