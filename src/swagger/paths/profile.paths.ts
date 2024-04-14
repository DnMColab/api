import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';

import {
  ProfileCreateDTOSchema,
  ProfileDTOSchema,
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
    ApiBearerAuth('Bearer'),
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

export function ProfilesSearchPath() {
  return applyDecorators(
    ApiExtraModels(ProfileDTOSchema),
    ApiOperation({
      operationId: 'proto.rest.profile.search',
      summary: 'Search for profiles',
    }),
    ApiBearerAuth('Bearer'),
    ApiBody({
      type: ProfileSearchSchema,
    }),
    ApiResponse({
      status: 200,
      schema: {
        type: 'array',
        items: {
          $ref: getSchemaPath(ProfileDTOSchema),
        },
      },
    }),
  );
}
