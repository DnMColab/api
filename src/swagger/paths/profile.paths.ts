import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import {
  ProfileCreateDTOSchema,
  ProfileSearchSchema,
  ProfileUpdateDTOSchema,
} from '../schemas/profile.schemas';

export function ProfileCreatePath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.profile.create',
      summary: 'Create a new profile',
    }),
    ApiBearerAuth('Bearer'),
    ApiBody({ type: ProfileCreateDTOSchema }),
  );
}

export function ProfileGetByIdPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.profile.getById',
      summary: 'Get a profile by id',
    }),
    ApiParam({ name: 'id', type: 'string', description: 'Profile id' }),
  );
}

export function ProfileGetCurrentPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.profile.getCurrent',
      summary: 'Get current profile',
    }),
    ApiBearerAuth('Bearer'),
  );
}

export function ProfileUpdatePath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.profile.update',
      summary: 'Update a profile',
    }),
    ApiBearerAuth('Bearer'),
    ApiBody({ type: ProfileUpdateDTOSchema }),
  );
}

export function ProfilesGetPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.profile.getMany',
      summary: 'Get profiles',
    }),
    ApiBody({
      type: ProfileSearchSchema,
    }),
    ApiResponse({
      status: 200,
      schema: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/ProfileDTOSchema',
        },
      },
    }),
  );
}
