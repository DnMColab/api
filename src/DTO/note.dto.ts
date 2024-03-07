import { ApiProperty } from '@nestjs/swagger';

import { TagDTO, TagDTOSchema } from './tag.dto';

export interface NoteDTO {
  id: string;

  body: string;

  tags?: TagDTO[];

  parentId?: string;
  authorId: string;

  createdAt: Date;
  updatedAt: Date;
}

export class NoteDTOSchema implements NoteDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  body: string;

  @ApiProperty({ required: false })
  tags?: TagDTOSchema[];

  @ApiProperty({ required: false })
  parentId?: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export interface NoteCreateDTO {
  body: string;

  parentId?: string;

  tags?: TagDTO[];
}

export class NoteCreateDTOSchema implements NoteCreateDTO {
  @ApiProperty()
  body: string;

  @ApiProperty({ required: false })
  parentId?: string;

  @ApiProperty({ required: false })
  tags?: TagDTOSchema[];
}

export interface NoteUpdateDTO {
  body: string;

  parentId?: string;

  tags?: TagDTO[];
}

export class NoteUpdateDTOSchema implements NoteUpdateDTO {
  @ApiProperty()
  body: string;

  @ApiProperty({ required: false })
  parentId?: string;

  @ApiProperty({ required: false })
  tags?: TagDTOSchema[];
}
