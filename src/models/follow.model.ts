import { FollowDTO } from '../DTO/follow.dto';

export class Follow {
  id: string;

  followerId: string;

  followingId: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(follow: FollowDTO) {
    this.id = follow.id;
    this.followerId = follow.followerId;
    this.followingId = follow.followingId;
    this.createdAt = follow.createdAt;
    this.updatedAt = follow.updatedAt;
  }
}
