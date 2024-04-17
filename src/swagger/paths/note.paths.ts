import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import {
  NoteCreateDTOSchema,
  NoteUpdateDTOSchema,
} from '../schemas/note.schemas';

export function NoteLikePath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.note.like',
      summary: 'Like a note',
    }),
    ApiBearerAuth('Bearer'),
    ApiParam({ name: 'id', type: 'string', description: 'Note id' }),
  );
}

export function NoteUnlikePath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.note.unlike',
      summary: 'Unlike a note',
    }),
    ApiBearerAuth('Bearer'),
    ApiParam({ name: 'id', type: 'string', description: 'Note id' }),
  );
}

export function NoteCreatePath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.note.create',
      summary: 'Create a new note',
    }),
    ApiBearerAuth('Bearer'),
    ApiBody({ type: NoteCreateDTOSchema }),
  );
}

export function NoteGetFeedPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.note.getFeed',
      summary: 'Get notes feed',
    }),
    ApiQuery({ name: 'skip', type: 'number', required: false }),
    ApiQuery({ name: 'take', type: 'number', required: false }),
    ApiBearerAuth('Bearer'),
  );
}

export function NoteGetByIdPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.note.getById',
      summary: 'Get a note by id',
    }),
    ApiBearerAuth('Bearer'),
    ApiParam({ name: 'id', type: 'string', description: 'Note id' }),
  );
}

export function NotesGetByTagsPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.note.getByTags',
      summary: 'Get notes by tags',
    }),
    ApiBearerAuth('Bearer'),
    ApiQuery({ name: 'tags', type: 'string', isArray: true }),
    ApiQuery({ name: 'skip', type: 'number', required: false }),
    ApiQuery({ name: 'take', type: 'number', required: false }),
  );
}

export function NotesGetByParentIdPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.note.getByParentId',
      summary: 'Get notes by parent id',
    }),
    ApiBearerAuth('Bearer'),
    ApiParam({ name: 'parentId', type: 'string', description: 'Parent id' }),
    ApiQuery({ name: 'skip', type: 'number', required: false }),
    ApiQuery({ name: 'take', type: 'number', required: false }),
  );
}

export function NotesGetByAuthorIdPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.note.getByAuthorId',
      summary: 'Get notes by author id',
    }),
    ApiBearerAuth('Bearer'),
    ApiParam({ name: 'authorId', type: 'string', description: 'Author id' }),
    ApiQuery({ name: 'skip', type: 'number', required: false }),
    ApiQuery({ name: 'take', type: 'number', required: false }),
  );
}

export function NotesSearchPath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.note.search',
      summary: 'Search notes',
    }),
    ApiBearerAuth('Bearer'),
    ApiQuery({ name: 'query', type: 'string' }),
    ApiQuery({ name: 'skip', type: 'number', required: false }),
    ApiQuery({ name: 'take', type: 'number', required: false }),
  );
}

export function NoteUpdatePath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.note.update',
      summary: 'Update a note',
    }),
    ApiBearerAuth('Bearer'),
    ApiBody({ type: NoteUpdateDTOSchema }),
  );
}

export function NoteDeletePath() {
  return applyDecorators(
    ApiOperation({
      operationId: 'proto.rest.note.delete',
      summary: 'Delete a note',
    }),
    ApiBearerAuth('Bearer'),
    ApiParam({ name: 'id', type: 'string', description: 'Note id' }),
  );
}
