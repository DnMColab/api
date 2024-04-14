import { ApiProperty } from '@nestjs/swagger';

import { NoteCreateDTO, NoteDTO, NoteUpdateDTO } from 'src/DTO/note.dto';
import { TagDTOSchema } from './tag.schemas';

export class NoteDTOSchema implements NoteDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  body: string;

  @ApiProperty({ required: false })
  tags?: TagDTOSchema[];

  @ApiProperty({ required: false })
  parentId?: string;

  @ApiProperty({ format: 'cuid' })
  authorId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class NoteCreateDTOSchema implements NoteCreateDTO {
  @ApiProperty()
  body: string;

  @ApiProperty({ required: false })
  parentId?: string;

  @ApiProperty({ required: false })
  tags?: string[];
}

export class NoteUpdateDTOSchema implements NoteUpdateDTO {
  @ApiProperty()
  body: string;

  @ApiProperty({ required: false })
  parentId?: string;

  @ApiProperty({ required: false })
  tags?: string[];
}
