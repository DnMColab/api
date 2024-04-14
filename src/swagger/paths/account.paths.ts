import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { AccountCreateDTOSchema } from '../schemas/account.schemas';

export function AccountRegisterPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.account.register',
      summary: 'Register a new account',
    }),
    ApiBody({ type: AccountCreateDTOSchema }),
    ApiResponse({
      status: 400,
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Account already exists',
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      schema: { type: 'object', properties: { id: { type: 'string' } } },
    }),
  );
}

export function AccountGetByIdPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.account.getById',
      summary: 'Get an account by id',
    }),
    ApiBearerAuth('Bearer'),
    ApiParam({ name: 'id', type: 'string', description: 'Account id' }),
  );
}
