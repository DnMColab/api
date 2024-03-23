import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

export function SecurityVerificationRequestPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.security.verification.request',
      summary: 'Request account verification',
    }),
    ApiBearerAuth('Bearer'),
    ApiResponse({
      status: 400,
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'verification email already sent',
          },
        },
      },
    }),
  );
}

export function SecurityVerifyProfilePath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.security.verify',
      summary: 'Verify profile',
    }),
    ApiParam({ name: 'code', type: 'string' }),
    ApiParam({ name: 'id', type: 'string' }),
    ApiBearerAuth('Bearer'),
  );
}
