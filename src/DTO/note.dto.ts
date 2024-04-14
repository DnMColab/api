export interface NoteDTO {
  id: string;

  body: string;

  tags?: { name: string }[];

  parentId?: string;
  authorId: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface NoteCreateDTO {
  body: string;

  parentId?: string;

  tags?: string[];
}

export interface NoteUpdateDTO {
  body: string;

  parentId?: string;

  tags?: string[];
}
