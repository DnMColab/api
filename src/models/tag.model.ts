import { TagDTO } from '../DTO/tag.dto';

export class TagModel {
  public readonly id: string;

  public name: string;

  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor({ name }: { name: string }) {
    this.name = name;
  }

  static fromArray(tags: TagDTO[]): TagModel[] {
    return tags.map((tag) => new TagModel(tag));
  }
}
