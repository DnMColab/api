import { LikeDTO } from 'src/DTO/like.dto';

export class LikeModel {
  id: string;

  noteId: string;

  profileId: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(data: LikeDTO) {
    this.id = data.id;
    this.noteId = data.noteId;
    this.profileId = data.profileId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
