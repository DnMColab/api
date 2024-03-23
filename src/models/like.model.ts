import { LikeDTO } from 'src/DTO/like.dto';
import { NoteModel } from './note.model';
import { ProfileModel } from './profile.model';

export class LikeModel {
  id: string;

  noteId: string;

  profileId: string;

  createdAt: Date;
  updatedAt: Date;

  constructor({ id, noteId, profileId, createdAt, updatedAt }: LikeDTO) {
    this.id = id;
    this.noteId = noteId;
    this.profileId = profileId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromArray(
    likes: (LikeDTO & { note: NoteModel; profile: ProfileModel })[],
  ): LikeModel[] {
    return likes.map((like) => new LikeModel(like));
  }
}
