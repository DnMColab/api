import { TagDTO } from '../DTO/tag.dto';

export class TagModel {
  public readonly id: string;

  public name: string;

  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor({ id, name, createdAt, updatedAt }: TagDTO) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromArray(tags: TagDTO[]): TagModel[] {
    return tags.map((tag) => new TagModel(tag));
  }
}
