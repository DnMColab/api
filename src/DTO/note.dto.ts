import { TagDTO } from './tag.dto';

export interface NoteDTO {
  id: string;

  body: string;

  tags?: TagDTO[];

  parentId?: string;
  authorId: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface NoteCreateDTO {
  body: string;

  parentId?: string;

  tags?: TagDTO[];
}

export interface NoteUpdateDTO {
  body: string;

  parentId?: string;

  tags?: TagDTO[];
}
