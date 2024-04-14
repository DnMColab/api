import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function SecurityRequestPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.security.request',
      summary: 'Send verification request',
    }),
    ApiParam({
      name: 'type',
      type: 'string',
      enum: ['EMAIL_VERIFICATION', 'EMAIL_CHANGE', 'PASSWORD_CHANGE'],
    }),
    ApiBearerAuth('Bearer'),
  );
}

export function SecurityVerifyProfilePath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.security.verify',
      summary: 'Verify profile',
    }),
    ApiParam({ name: 'id', type: 'string' }),
    ApiParam({ name: 'code', type: 'string' }),
    ApiBearerAuth('Bearer'),
  );
}

export function SecurityPasswordResetPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.security.reset',
      summary: 'Reset password',
    }),
    ApiParam({ name: 'id', type: 'string' }),
    ApiParam({ name: 'token', type: 'string' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          password: {
            type: 'string',
          },
        },
      },
    }),
    ApiBearerAuth('Bearer'),
  );
}

export function SecurityEmailChangePath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.security.changeEmail',
      summary: 'Change email',
    }),
    ApiParam({ name: 'id', type: 'string' }),
    ApiParam({ name: 'token', type: 'string' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
          },
        },
      },
    }),
    ApiBearerAuth('Bearer'),
  );
}

export function SecurityRequestRejectPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.security.requestReject',
      summary: 'Reject last request',
    }),
    ApiBearerAuth('Bearer'),
  );
}
