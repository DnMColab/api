import { NoteDTO } from 'src/DTO/note.dto';
import { TagModel } from './tag.model';

export class NoteModel {
  public readonly id: string;

  public body: string;

  public parentId?: string;
  public authorId: string;

  tags?: TagModel[];

  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor({
    id,
    body,
    parentId,
    authorId,
    tags,
    createdAt,
    updatedAt,
  }: NoteDTO) {
    this.id = id;
    this.body = body;
    this.parentId = parentId;
    this.authorId = authorId;
    this.tags = tags?.map((tag) => new TagModel(tag));
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
