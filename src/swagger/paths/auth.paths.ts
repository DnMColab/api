import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthDTOSchema } from 'src/swagger/schemas/auth.schemas';

export function RestAuthPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.auth',
      summary: 'Generate authorization token for RESTful API',
    }),
    ApiBody({ type: AuthDTOSchema }),
    ApiResponse({
      status: 400,
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', description: 'Invalid credentials' },
        },
      },
    }),
    ApiResponse({
      status: 200,
      schema: {
        type: 'object',
        properties: { accessToken: { type: 'string' } },
      },
    }),
  );
}

export function RestAuthRefreshPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.auth.refresh',
      summary: 'Refresh authorization token for RESTful API',
    }),
    ApiBearerAuth('Bearer'),
    ApiResponse({
      status: 200,
      schema: {
        type: 'object',
        properties: { accessToken: { type: 'string' } },
      },
    }),
  );
}
